export const sampleChats = [
    {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1","2"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "2",
        groupChat: false,
        members: ["1","2"],
    },
    
];

export const sampleUsers = [
    {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John Doe",
        _id: "1",
    },
    {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John Boi",
        _id: "2",
    },
];

export const sampleNotifications = [
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Doe",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Boi",
        },
        _id: "2",
    },
]

export const sampleMessage = [
    {
        attachments: [],
        content: "Kya gayo chhe, Kyare aais",
        _id: "ffnsljfnkejfjefekj",
        sender: {
            _id: "user._id",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
        attachments: [
            {
                public_id: "asdssd",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "",
        _id: "ffnsljfnksfsejfjefekj",
        sender: {
            _id: "lshddkfhpr",
            name: "Dev Patel",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    }
]

export const dashboardData = {
    users: [
        {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Doe",
            _id: "1",
            username: "john_doe",
            friends: 20,
            groups: 5,
        },
        {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Boi",
            _id: "2",
            username: "john_boi",
            friends: 20,
            groups: 5,
        },
    ],
    chats: [{
        name: "Old School Group",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "1",
        groupChat: false,
        members: [{_id: "1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},{_id: "2",avatar: "https://www.w3schools.com/howto/img_avatar.png"}],
        totalMembers: 2,
        totalMessages: 20,
        creator: {
            name: "John Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
    },
    {
        name: "College Group",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "2",
        groupChat: false,
        members: [{_id: "1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},{_id: "2",avatar: "https://www.w3schools.com/howto/img_avatar.png"}],
        totalMembers: 2,
        totalMessages: 20,
        creator: {
            name: "John Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
    },
],
messages: [
    {
        attachments: [],
        content: "Kya gayo chhe Kyare aais",
        _id: "ffnsljfnkejfjefekj",
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Chaman",
        },
        chat: "chatId",
        groupChat: false,
        createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
        attachments: [
            {
                public_id: "asdssd",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            },
        ],
        content: "",
        _id: "fsflkpfwprmjo",
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "Chaman 2",
        },
        chat: "chatId",
        groupChat: true,
        createdAt: "2024-02-12T10:41:30.630Z",
    },

]
}