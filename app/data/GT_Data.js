export const DANHMUC = [
  {
    id: 1,
    name: 'Bản đồ giao thông',
    navigate: 'BanDoScreen',
    data: {
      dataFilter: [
        {
          id: 0,
          icon: 'gas-pump',
          name: 'Trạm xăng',
        },
        {
          id: 1,
          icon: 'parking',
          name: 'Điểm đỗ xe',
        },
        {
          id: 2,
          icon: 'tools',
          name: 'Gara ô tô',
        },
        {
          id: 3,
          icon: 'money-bill',
          name: 'Trạm thu phí',
        },
        {
          id: 4,
          icon: 'money-bill',
          name: 'Điểm đen giao thông',
        },
      ],
    },
    icon: require('../Images/map.png'),
    background: require('../Images/gt2.jpg'),
  },
  {
    id: 10,
    name: 'Đi chung xe',
    navigate: 'GT_DICHUNGXE_MainScreen',
    icon: require('../Images/uber.png'),
    background: require('../Images/gt9.jpg'),
  },
  {
    id: 0,
    name: 'Đặt vé xe, máy bay',
    navigate: 'GT_VEXEVEMB_MainScreen',
    icon: require('../Images/boarding.png'),
    background: require('../Images/gt1.jpg'),
  },

  {
    id: 10,
    name: 'Phạt nguội',
    navigate: 'GT_PHATNGUOI_MainScreen',
    icon: require('../Images/paper.png'),
    background: require('../Images/gt10.png'),
  },
  {
    id: 8,
    name: 'Sổ tay luật giao thông',
    navigate: 'GT_STLGT_MainScreen',
    icon: require('../Images/balance.png'),
    background: require('../Images/gt7.jpg'),
  },
  {
    id: 9,
    name: 'Ôn thi GPLX',
    navigate: 'GT_OTGPLX_MainScreen',
    icon: require('../Images/test.png'),
    background: require('../Images/gt11.jpg'),
  },
];

export const MENU = [
  {
    appid: 1,
    name: 'Tìm xe khách',
    navigate: 'GT_DiChung_TimXeKhach_Screen',
    icon: 'car-bus',
    color: '#c0ca33',
  },
  {
    appid: 2,
    name: 'Đi chung',
    navigate: 'GT_DiChung_DiChung_Screen',
    icon: 'car',
    color: '#e64a19',
  },
  {
    appid: 3,
    name: 'Đăng tin',
    navigate: 'GT_DiChung_DangTin_Screen',
    icon: 'bullhorn',
    color: '#5B63EC',
  },
  {
    appid: 4,
    name: 'Tin của tôi',
    navigate: 'GT_DiChung_CaNhan_Screen',
    icon: 'user-alt',
    color: '#bdbdbd',
  },
];
