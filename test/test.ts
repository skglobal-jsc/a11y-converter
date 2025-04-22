import { tinyhtml, html2Text } from '../src';

jest.useRealTimers();

const html = `
<html>
  <body>
    <h1>Test</h1>
    <span>Audio</span> <audio src="https://example.com/audio.mp3"></audio>
    <span>Video</span> <video src="https://example.com/video.mp4"></video>
  </body>
</html>
`;

describe('Test tinyhtml', () => {
  it('should parse audio and video tags', async () => {

    const { html: simplifiedHTML } = await tinyhtml(html);
    console.log(simplifiedHTML);
    expect(simplifiedHTML).toContain('<span>Audio</span> <span>https://example.com/audio.mp3</span>');
    expect(simplifiedHTML).toContain('<span>Video</span> <span>https://example.com/video.mp4</span>');
  });
});

describe.skip('Test html2Text', () => {
  it('should parse audio and video tags', async () => {
    const { plainText, a11yHTML } = await html2Text({ html, iArticle: {} as any });
    console.log(plainText, a11yHTML);
    expect(plainText).toContain('TestAudiohttps://example.com/audio.mp3Videohttps://example.com/video.mp4');
  });
});