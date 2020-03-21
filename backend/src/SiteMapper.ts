/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */
import fetch from 'node-fetch';
import cheerio from 'cheerio';

type PageSizeArrayType = {
  pageName: string;
  pageSize: number;
}

class SiteMapper {
  private url = '';
  private deep: number;
  private urlsArray: string[];
  private pageSizeArray = [] as PageSizeArrayType[];

  constructor(url: string, deep: number) {
    this.url = url;
    this.deep = deep;
    this.urlsArray = [];
  }

  private getUrls = async (url: string) => {
    const absoluteUrl = this.checkUrlOnAbsolutePath(url) ? url : `${this.getDomain()[0]}/${url}`;

    try {
      const response = await fetch(absoluteUrl, {method: 'GET'});
      const textBody = await response.text();

      return {
        urlsArray: this.parseTag(textBody),
        pageSize: textBody.length,
        pageName: url,
      };
    } catch (err) {
      console.log('Упал на запросе ', absoluteUrl, err);
      throw err;
    }
  };

  public getMaxSizePage = () => {
    if (this.pageSizeArray?.length === 0) throw new Error();

    let maxPage = {pageSize: 0} as PageSizeArrayType;

    this.pageSizeArray.forEach((value) => {
      if (value.pageSize > maxPage.pageSize) {
        maxPage = value;
      }
    });
    return maxPage;
  }
  public getMinPageSize = () => {
    if (this.pageSizeArray?.length === 0) throw new Error();

    let minPage = this.pageSizeArray[0];

    this.pageSizeArray.forEach((value) => {
      if (value.pageSize < minPage.pageSize) {
        minPage = value;
      }
    });
    return minPage;
  }

  public getParsedUrls = () => {
    if (this.pageSizeArray?.length === 0) throw new Error();

    return this.urlsArray;
  }

  public getPagesArray = () => {
    if (this.pageSizeArray?.length === 0) throw new Error();

    return this.pageSizeArray;
  }

  public parse = async () => {
    try {
      await this.createNextIteration(this.deep, this.url);
      return this.urlsArray;
    } catch (err) {
      console.log(err);
    }
  }

  private checkUrlOnAbsolutePath = (url: string) => {
    const urlPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
    return urlPattern.test(url);
  }

  private getDomain = () => {
    const pattern = /^(?:\/\/|[^\/]+)*/;
    const res = pattern.exec(this.url);
    if (!res?.length) {
      throw new Error();
    };
    return res;
  }

  private createNextIteration = async (deep: number, url: string) => {
    if (deep < 1) return;
    try {
      const pageInfo = await this.getUrls(url);
      this.pageSizeArray.push(
          {
            pageSize: pageInfo.pageSize,
            pageName: pageInfo.pageName,
          },
      );

      return await Promise.all(pageInfo.urlsArray
          .reduce(
              (acc, url) => {
                if (!this.urlsArray.includes(url) && !this.checkUrlOnAbsolutePath(url) && deep > 1) {
                  this.urlsArray.push(url);
                  acc.push(this.createNextIteration(deep - 1, url));
                }
                return acc;
              },
          [] as Promise<any>[]));
    } catch (err) {
      throw err;
    }
  };

  private parseTag = (data: string) : string[] => {
    const $ = cheerio.load(data);
    return $('a')
        .map((index, el) => el.attribs['href'])
        .get();
  };
}
export default SiteMapper;
