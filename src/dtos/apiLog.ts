import { Request } from "express";

export class RequestDTO {
  readonly method: string;
  readonly protocol: string;
  readonly baseUrl: string;
  readonly originalUrl: string;
  readonly url: string;
  readonly headers: any;
  readonly body: any;
  readonly query: any;
  readonly params: any;
  constructor(req: Request) {
    this.method = req.method;
    this.protocol = req.protocol;
    this.originalUrl = req.originalUrl;
    this.baseUrl = req.baseUrl;
    this.url = req.url;
    this.headers = req.headers;
    this.body = req.body;
    this.query = req.query;
    this.params = req.params;
  }
}
