export class Ad {
  constructor(data) {
    this.title = data.title
    this.linkUrl = data.linkURL
    this.imgs = [data.tall, data.square, data.banner]
  }

  get tallImg() {
    return this.imgs[0];
  }

  get squareImg() {
    return this.imgs[1];
  }

  get bannerImg() {
    return this.imgs[2];
  }
}