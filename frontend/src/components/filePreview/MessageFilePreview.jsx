import pdfIcon from '../../assets/images/pdf-logo.png';
import wordIcon from '../../assets/images/word-logo.png';
import txtIcon from '../../assets/images/txt-logo.png';
import { PiDownloadSimple } from "react-icons/pi";

function getFileTypeFromBase64(base64String) {
    if (!base64String) return;
    const base64Data = base64String.replace(/^data:[^;]+;base64,/, '');
    const binaryData = atob(base64Data);
    const header = binaryData.substring(0, 4);

    const signatures = {
        '\xFF\xD8\xFF\xE0': 'JPEG',
        '\x89\x50\x4E\x47': 'PNG',
        'BM': 'BMP',
        '%PDF': 'PDF',
        'PK\x03\x04': 'DOCX',
        '\xFF\xFE': 'TXT',
        '\xFE\xFF': 'TXT',
        '\xEF\xBB\xBF': 'TXT',
        'impo': 'TXT'
    };

    for (const [signature, fileType] of Object.entries(signatures)) {
        if (header.startsWith(signature)) {
            return fileType;
        }
    }
    return 'Unknown';
}

export const MessageFilePreview = ({ fileName, file }) => {
    const fileType = getFileTypeFromBase64(file);
    let icon;

    switch (fileType) {
        case 'PDF':
            icon = pdfIcon;
            break;
        case 'DOCX':
            icon = wordIcon;
            break;
        case 'TXT':
            icon = txtIcon;
            break;
        default:
            icon = '';
            break;
    }

    return (
        <div className='bg-white p-1 rounded-lg'>
            <div className="bg-gray-300 text-black rounded-lg">
                <img className='h-16 w-13' src={icon} alt={`${fileType} Icon`} />
                <div className="flex gap-4 ml-auto">
                    <p className='text-lg pl-4'>{fileName}</p>
                    <a href={file}>
                        <PiDownloadSimple className='w-6 h-6' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MessageFilePreview;