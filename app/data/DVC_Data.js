export const DANHMUC = [
  {
    id: 0,
    name: 'Tra cứu hồ sơ',
    navigate: 'DVC_TKHS_SearchScreen',
    icon: require('../Images/loupe.png'),
    background: require('../Images/dvc1.jpg'),
  },
  {
    id: 1,
    name: 'Hồ sơ theo dõi',
    navigate: 'DVC_TKHS_MainScreen',
    icon: require('../Images/contract.png'),
    background: require('../Images/dvc2.jpg'),
  },
  {
    id: 2,
    name: 'Tra cứu thủ tục',
    navigate: 'DVC_TCTT_MainScreen',
    icon: require('../Images/tctt.png'),
    background: require('../Images/dvc3.jpg'),
  },
  {
    id: 3,
    name: 'Thống kê dịch vụ công',
    navigate: 'DVC_ThongKe_MainScreen',
    icon: require('../Images/chart.png'),
    background: require('../Images/dvc3.jpg'),
  },
  {
    id: 4,
    name: 'Cổng dịch vụ công Bộ KH & Đầu tư',
    navigate: 'WebViewScreen',
    icon: require('../Images/mail.png'),
    background: require('../Images/dvc4.jpg'),
    data: {
      title: '',
      url: 'https://dichvucong.mpi.gov.vn/web/cong-dvc-bkhdt/thu-tuc-hanh-chinh#/thu-tuc-hanh-chinh?page=1&agency=BKHDT&renew=98',
      colorHeader: '#FFFAF3',
      hideBackForward: false,
    },
  },
];
