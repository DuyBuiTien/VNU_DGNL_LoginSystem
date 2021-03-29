export const DANHMUC = [
  {
    id: 0,
    name: 'Danh bạ khẩn cấp',
    navigate: 'YT_DanhBaScreen',
    icon: require('../Images/sos.png'),
    background: require('../Images/yt2.jpg'),
  },
  {
    id: 1,
    name: 'Bản đồ y tế',
    navigate: 'BanDoScreen',
    data: {
      dataFilter: [
        {
          id: 0,
          icon: 'hospital',
          name: 'Bệnh viện',
        },
        {
          id: 1,
          icon: 'capsules',
          name: 'Hiệu thuốc',
        },
        {
          id: 2,
          icon: 'stethoscope',
          name: 'Phòng khám',
        },
        {
          id: 3,
          icon: 'briefcase-medical',
          name: 'Trạm y tế',
        },
      ],
    },
    icon: require('../Images/map.png'),
    background: require('../Images/gt2.jpg'),
  },
  {
    id: 2,
    name: 'Đặt lịch khám',
    navigate: 'YT_DatLichKhamScreen',
    icon: require('../Images/examination.png'),
    background: require('../Images/yt2.jpg'),
  },
  {
    id: 3,
    name: 'Tra cứu chỉ số sức khoẻ',
    navigate: 'WebViewScreen',
    icon: require('../Images/bmi_icon.png'),
    background: require('../Images/bmi.jpg'),
    data: {
      title: '',
      url: 'https://prod.namdinh.tetvietaic.com/pages/bmi',
      colorHeader: '#FFFAF3',
      hideBackForward: false,
    },
  },
  /* {
    id: 4,
    name: 'Trạm y tế',
    navigate: 'YT_TramYTeScreen',
    icon: require('../Images/hospital.png'),
    background: require('../Images/yt3.jpg'),
  }, */
  {
    id: 5,
    name: 'Dịch bệnh',
    navigate: 'YT_DichBenhScreen',
    icon: require('../Images/virus.png'),
    background: require('../Images/yt4.jpg'),
  },
  /* {
    id: 6,
    name: 'Quầy thuốc',
    navigate: 'YT_QuayThuocScreen',
    icon: require('../Images/pharmacy.png'),
    background: require('../Images/yt5.jpg'),
  }, */
  {
    id: 7,
    name: 'Tra cứu thẻ BHYT',
    navigate: 'WebViewScreen',
    icon: require('../Images/bhxh.png'),
    background: require('../Images/yt2.jpg'),
    data: {
      title: '',
      url: 'https://baohiemxahoi.gov.vn/tracuu/Pages/tra-cuu-thoi-han-su-dung-the-bhyt.aspx',
      colorHeader: '#FFFAF3',
      hideBackForward: false,
    },
  },
  {
    id: 8,
    name: 'Tra cứu thuốc',
    navigate: 'WebViewScreen',
    icon: require('../Images/drugbank.png'),
    background: require('../Images/yt2.jpg'),
    data: {
      title: '',
      url: 'https://drugbank.vn',
      colorHeader: '#FFFAF3',
      hideBackForward: false,
    },
  },
];
