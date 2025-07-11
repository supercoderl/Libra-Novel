export type User = {
    userID: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    isActive: number;
};

export const richTextOptions = {
    toolbarButtons: ['undo', 'redo', 'fontFamily', 'fontSize', "align", 'textColor', 'bold', 'italic', 'underline', 'alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'strikeThrough', 'outdent', 'indent', 'clearFormatting'],
    pluginsEnabled: ['align', 'charCounter'],
    charCounterMax: 140,
    fontSizeSelection: true,
    fontFamily: {
        'Arial,Helvetica,sans-serif': 'Arial',
        'Georgia,serif': 'Georgia',
        'Impact,Charcoal,sans-serif': 'Impact',
        'Tahoma,Geneva,sans-serif': 'Tahoma',
        'Times New Roman,Times,serif': 'Times New Roman',
        'Verdana,Geneva,sans-serif': 'Verdana',
    },
    moreParagraph: {
        buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        align: 'left',
        buttonsVisible: 3
    },
    colorsText: [
        '#15E67F', '#E3DE8C', '#D8A076', '#D83762', '#76B6D8', 'REMOVE',
        '#1C7A90', '#249CB8', '#4ABED9', '#FBD75B', '#FBE571', '#FFFFFF'
    ]
};

export const provider = [
    {
        id: 1,
        img: "https://static-00.iconduck.com/assets.00/visa-icon-2048x1286-fhy0jwfc.png",
        label: "paypal"
    },
    {
        id: 2,
        img: "https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1286-s6y46dfh.png",
        label: "mastercard" 
    },
    {
        id: 4,
        img: "https://static-00.iconduck.com/assets.00/credit-card-emoji-2048x1317-btgi2qqv.png",
        label: "bank"
    }
]