
export interface MailBody {
    host: string;
    port: string;
    user:string;
    password:string;
    attachments: Attachment[];
    text: string;
    email: string;
    subject: string;
}
export interface Attachment {
    fileName: string;
    content: string;
}
