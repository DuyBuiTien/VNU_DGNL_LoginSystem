export const DANHMUC = [
    {
        id: 1,
        name: 'Tin nóng trong nước',
        navigate: 'DT_TNScreen',
        icon: require("../Images/vietnam.png"),
        background: require("../Images/dt1.jpg"),
    },
    {
        id: 2,
        name: 'Tin nóng quốc tế',
        navigate: 'DT_QTScreen',
        icon: require("../Images/world.png"),
        background: require("../Images/dt2.jpg"),
    },
    {
        id: 3,
        name: 'Báo trong ngày',
        navigate: 'DT_BTNScreen',
        icon: require("../Images/newspaper.png"),
        background: require("../Images/paht2.jpg"),
    },
    {
        id: 4,
        name: 'Tin thời sự',
        navigate: 'WebViewScreen',
        icon: require("../Images/newspaper.png"),
        background: require("../Images/dt4.jpg"),
        data: {
            title: '',
            url: 'https://vtv.vn/truyen-hinh-truc-tuyen/vtv1/thoi-su-0.html',
            colorHeader: '#FFFAF3',
            hideBackForward: false,
          },
    },
  ];
  