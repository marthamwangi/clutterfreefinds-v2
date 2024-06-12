import { IInquiry, InquiryData } from './footer.model';

export class InquiryMapper {
  mapTo(inquiry: IInquiry): InquiryData {
    return {
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
    };
  }
}
