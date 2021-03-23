export const DANHMUC = [
  {
    id: 0,
    name: 'Bản đồ du lịch',
    navigate: 'BanDoScreen',
    data: {
      dataFilter: [
        {
          id: 0,
          icon: 'concierge-bell',
          name: 'Nhà hàng',
        },
        {
          id: 10,
          icon: 'hotel',
          name: 'Khách sạn',
        },
        {
          id: 1,
          icon: 'shopping-cart',
          name: 'Điểm mua sắm',
        },
        {
          id: 3,
          icon: 'map-marked',
          name: 'Địa điểm nổi tiếng',
        },
        {
          id: 4,
          icon: 'monument',
          name: 'Di tích lịch sử',
        },
        {
          id: 5,
          icon: 'calendar-day',
          name: 'Sự kiện dịp Tết',
        },
        {
          id: 6,
          icon: 'mask',
          name: 'Lễ hội',
        },
        {
          id: 7,
          icon: 'gratipay',
          name: 'Danh lam thắng cảnh',
        },
        {
          id: 8,
          icon: 'gopuram',
          name: 'Đền',
        },
        {
          id: 9,
          icon: 'gopuram',
          name: 'Chùa',
        },
        {
          id: 11,
          icon: 'church',
          name: 'Nhà thờ',
        },
      ],
    },
    icon: require('../Images/map.png'),
    background: require('../Images/gt2.jpg'),
  },
  {
    id: 1,
    name: 'Danh sách đường',
    navigate: 'DL_DSD_Screen',
    icon: require('../Images/destination.png'),
    background: require('../Images/dl1.jpg'),
  },
  {
    id: 2,
    name: 'Sản phẩm du lịch',
    navigate: 'DL_SPDL_Screen',
    icon: require('../Images/design.png'),
    background: require('../Images/dl2.jpg'),
  },
  {
    id: 3,
    name: 'Cơ sở lưu trú',
    navigate: 'DL_CSLT_Screen',
    icon: require('../Images/hotel.png'),
    background: require('../Images/dl3.jpg'),
  },
  {
    id: 4,
    name: 'Điểm du lịch',
    navigate: 'DL_DDL_Screen',
    icon: require('../Images/placeholder.png'),
    background: require('../Images/dl4.jpg'),
  },
];
