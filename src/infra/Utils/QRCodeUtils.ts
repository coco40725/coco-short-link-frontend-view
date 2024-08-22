export default class QRCodeUtils{

     static downloadQrCode = (qrCodeRef) => {
        const canvas = qrCodeRef.querySelector("canvas");
        const link = document.createElement('a');
        link.download = "qr-code.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }
}