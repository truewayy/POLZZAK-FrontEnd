// 이미지를 base64로 변환하는 함수
const imgToBase64 = (image: File) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result as string);
  });

export default imgToBase64;
