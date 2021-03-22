export const DANHMUC = [
    {
        id: 1,
        name: 'Cơ sở dữ liệu luật',
        navigate: 'DNNDT_CSDLLScreen',
        icon: require('../Images/law-scale.png'),
        background: require('../Images/paht1.jpg'),
    },
    {
        id: 2,
        name: 'Diễn đàn doanh nghiệp, nhà đầu tư',
        navigate: 'DNNDT_DDDNNDTScreen',
        icon: require('../Images/discussion.png'),
        background: require('../Images/paht2.jpg'),
    },
    {
        id: 3,
        name: 'Dự án kêu gọi đầu tư',
        navigate: 'DNNDT_DAKGDTScreen',
        icon: require('../Images/blueprint.png'),
        background: require('../Images/paht3.jpg'),
    },
    {
        id: 4,
        name: 'Đăng tin tuyển dụng',
        navigate: 'DNNDT_DTTDScreen',
        icon: require('../Images/headhunting.png'),
        background: require('../Images/paht4.jpg'),
    },
    {
        id: 5,
        name: 'Thông tin thị trường lao động',
        navigate: 'DNNDT_TTTTLDScreen',
        icon: require('../Images/headhunting.png'),
        background: require('../Images/paht1.jpg'),
    },
];
export const DAKGDT_DANHMUC = [
    {
        id: 1,
        name: 'Theo lĩnh vực',
        navigate: 'DNNDT_DAKGDT_LVScreen',
        icon: require('../Images/blueprint.png'),
        background: require('../Images/paht1.jpg'),
        data: {
            isLV: true
        }
    },
    {
        id: 2,
        name: 'Theo hình thức đầu tư',
        navigate: 'DNNDT_DAKGDT_LVScreen',
        icon: require('../Images/handshake.png'),
        background: require('../Images/paht2.jpg'),
        data: {
            isLV: false
        }
    },
]
export const DDDNNDT_DANHMUC = [
    {
        id: 1,
        name: 'Xu hướng đầu tư',
        navigate: 'DNNDT_DDDNNDTListScreen',
        icon: require('../Images/chart.png'),
        background: require('../Images/paht1.jpg'),
        data: {
            id: 1,
            title: 'Xu hướng đầu tư'
        }
    },
    {
        id: 2,
        name: 'Giấy chứng nhận đầu tư',
        navigate: 'DNNDT_DDDNNDTListScreen',
        icon: require('../Images/info.png'),
        background: require('../Images/paht2.jpg'),
        data: {
            id: 2,
            title: 'Giấy chứng nhận đầu tư'
        }
    },
    {
        id: 3,
        name: 'Thành lập doanh nghiệp',
        navigate: 'DNNDT_DDDNNDTListScreen',
        icon: require('../Images/architecture.png'),
        background: require('../Images/paht3.jpg'),
        data: {
            id: 3,
            title: 'Thành lập doanh nghiệp'
        }
    },
    {
        id: 4,
        name: 'Thành lập doanh nghiệp',
        navigate: 'DNNDT_DDDNNDTListScreen',
        icon: require('../Images/law-scale.png'),
        background: require('../Images/paht4.jpg'),
        data: {
            id: 4,
            title: 'Thành lập doanh nghiệp'
        }
    },
    {
        id: 5,
        name: 'Chia sẻ kinh nghiệm đầu tư',
        navigate: 'DNNDT_DDDNNDTListScreen',
        icon: require('../Images/conversation.png'),
        background: require('../Images/paht1.jpg'),
        data: {
            id: 5,
            title: 'Chia sẻ kinh nghiệm đầu tư'
        }
    },
    {
        id: 6,
        name: 'Chính sách ưu đãi',
        navigate: 'DNNDT_DDDNNDTListScreen',
        icon: require('../Images/tag.png'),
        background: require('../Images/paht1.jpg'),
        data: {
            id: 6,
            title: 'Chính sách ưu đãi'
        }
    },
]