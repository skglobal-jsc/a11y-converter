import { CLASS_NAME } from '../constant/index';

const defaultLang = 'ja'

const locale = (value) => ({
  Image: {
    ja: `ここに「${value}」の画像があります。`,
    en: `This image is about ${value}`,
    vi: `Đây là hình ảnh về ${value}`,
  },
  ImageNoAlt: {
    ja: `ここに画像があります。`,
    en: `There is a image`,
    vi: `Đây là một bức hình`,
  },
  StartArticle: {
    ja: `ここから本文です。`,
    en: `The content is as below`,
    vi: `Nội dung như sau đây`,
  },
  EndArticle: {
    ja: `以上です。`,
    en: `The End.`,
    vi: `Kết thúc nội dung.`,
  },
  TableCaption: {
    ja: `表のタイトルは${value}、です。`,
    en: `This table is about ${value}`,
    vi: `Dưới đây là bảng nói về ${value}`,
  },
  TableNumberRow: {
    ja: `この下に、縦${value}行`,
    en: `There are ${value} rows`,
    vi: `Có tổng cộng ${value} hàng`,
  },
  TableNumberColumn: {
    ja: `横${value}列の表があります。`,
    en: `There are ${value} column`,
    vi: `Có tổng cộng ${value} cột`,
  },
  TableEnd: {
    ja: `表(ひょう)の終わりです。`,
    en: `The table content ends.`,
    vi: `Kết thúc bảng`,
  },
  Table1stRow: {
    ja: `データの1行目、`,
    en: `The 1st row data`,
    vi: `Nội dung hàng đầu tiên`,
  },
  TableRow: {
    ja: `${value}行目、`,
    en: `Row data ${value}`,
    vi: `Nội dung hàng thứ ${value}`,
  },
  TableTitle: {
    ja: `見出し行は左から${value}です。`,
    en: `From the left, there are titles as following`,
    vi: `Từ bên trái, lần lượt có những tiêu đề như sau`,
  },
  Form: {
    ja: `この下に、フォームがあります。`,
    en: `There is a form`,
    vi: `Dưới đây có một biểu mẫu`,
  },
  Date: {
    ja: 'YYYY年MM月DD日',
    en: 'DD MM YYYY',
    vi: 'Ngày DD tháng MM năm YYYY',
  },
  ListIntroduction: {
    ja: value?.subItemNum > 0
      ? `ここに親${value?.rootItemNum}行と子${value?.subItemNum}行の箇条書きのリストがあります。`
      : `ここに${value?.rootItemNum}行の箇条書きのリストがあります。`,
    en: `This is ${
      value?.style === 'ordered' ? 'Numbered' : 'Bulleted'
      } list, there are ${value?.rootItemNum} items and ${
        value?.subItemNum
      } sub items`,
    vi: `Đây là danh sách được ${
      value?.style === 'ordered' ? 'đánh số' : 'gạch đầu dòng'
      }, danh sách có ${value?.rootItemNum} mục chính và ${
        value?.subItemNum
      } mục phụ.`
  },
  ImageAnnotation: {
    ja: value?.alt ? `ここに<span class="${CLASS_NAME.highlightText}">「${value?.alt}」</span>の画像があります。` : 'ここに画像があります。',
    en: value?.alt ? `This image is about <span class="${CLASS_NAME.highlightText}">${value?.alt}</span>.` : 'There is a image',
    vi: value?.alt ? `Đây là hình ảnh về <span class="${CLASS_NAME.highlightText}">${value?.alt}</span>.` : 'Đây là một bức hình',
  },
  TableIntroduction: {
    ja: `この下に、<span class="${CLASS_NAME.highlightText}">縦${value?.totalRows}行</span>、<span class="${CLASS_NAME.highlightText}">横${value?.totalCols}列</span>の表(ひょう)があります。`,
    en: `This is table with <span class="${CLASS_NAME.highlightText}">${value?.totalRows} rows</span>, <span class="${CLASS_NAME.highlightText}">${value?.totalCols} columns</span>.`,
    vi: `Đây là dữ liệu dạng bảng, <span class="${CLASS_NAME.highlightText}">có ${value?.totalRows} dòng</span>, <span class="${CLASS_NAME.highlightText}">${value?.totalCols} cột</span>.`
  },
  TableCaptionForDisplay: {
    ja: `表(ひょう)のタイトルは、${value?.caption}、です。`,
    en: `The title of the table is <span class="${CLASS_NAME.highlightText}">${value?.caption}</span>.`,
    vi: `Tiêu đề của bảng là <span class="${CLASS_NAME.highlightText}">${value?.caption}</span>.`
  },
  TableHeader: {
    ja: `見出し行は左から、${value?.header}です。`,
    en: `The table headers are ${value?.header}.`,
    vi: `Dòng tiêu đề là ${value?.header}, bắt đầu từ trái sang phải.`
  },
  TableFirstLine: {
    ja: `データの1行目、${value?.rowData}`,
    en: `The first line of data is ${value?.rowData}`,
    vi: `Dòng thứ nhất là ${value?.rowData}`
  },
  TableOtherLine: {
    ja: `${value?.line}行目、${value?.rowData}${value?.isEndRow ? '、です。' : ''}`,
    en: `Line ${value?.line}: ${value?.rowData}`,
    vi: `Dòng thứ ${value?.line} là ${value?.rowData}`
  },
  // TableEnd: {
  //   ja: '表(ひょう)の終わりです。',
  //   en: 'End table.',
  //   vi: 'Kết thúc bảng.'
  // }
});

export const useLocale = ({ key, lang, value }) => {
  return locale(value)[key][lang || defaultLang];
};
