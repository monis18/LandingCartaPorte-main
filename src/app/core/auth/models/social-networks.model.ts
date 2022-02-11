import { BaseModel } from '@crud';

export class SocialNetworks extends BaseModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;

  clear() {
    this.linkedIn = '';
    this.facebook = '';
    this.twitter = '';
    this.instagram = '';
  }
}
