import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { connect } from 'react-redux';
import { withAuth } from '../components/Auth';
import Page from '../components/Page';
import { Button, Input, Cascader } from 'antd';
import { Link } from "react-router-dom";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  
  class Avatar extends React.Component {
    state = {
      loading: false,
    };
  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };
  
    render() {
      const { loading, imageUrl } = this.state;
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      );
    }
  }
  const success = () => {
    message.success({
        content: 'Produkt został pomyślnie dodany',
        className: 'custom-class',
        style: {
            marginTop: '80vh',
        },
    });
};


const options = [
    {
      value: 'Sporty drużynowe',
      label: 'Sporty drużynowe',
      children: [
      ],
    },
    {
      value: 'Rowery i części',
      label: 'Rowery i części',
    },
    {
        value: 'Siłownia i fitness',
        label: 'Siłownia i fitness',
    },
  ];

const Product = () => {

    return (
        <Page>
            <div style={{
                marginTasvcasop: 30,
                textAlign: 'center'
            }}>
                <h1><b>Dodawanie nowego produktu:</b></h1>
            </div>
            <div style={{
                marginTop: 30,
                textAlign: 'center'
            }}>
                <h2>Nazwa:</h2>
                <Input placeholder="Nazwa:"></Input>
                <h2>Opis:</h2>
                <TextArea  rows={4} placeholder="Opis:"></TextArea>
                <h2>Kategoria</h2>
                <Cascader width={'100%'} placeholder="Wskaż kategorie:" options={options} style={{width: '100%'}} />
                <h2>Cena za dzień wypożyczenia</h2>
                <Input placeholder="Cena:"></Input>
                <h2>Zdjęcie:</h2>
                <Avatar />

            </div>

            <div style={{
                textAlign: 'center'
            }}>

                <Button  shape="round"
                    style={{
                        width: 400,
                        height: 70,
                        fontSize: 30,
                        marginTop: 10
                    }}
                    onClick={() => {
                    }}>
                    <Link to="/rental">Powrót</Link>
                </Button>
                <Button type="primary" shape="round"
                    style={{
                        width: 400,
                        height: 70,
                        fontSize: 30,
                        marginTop: 10
                    }}
                    onClick={() => {
                        success()
                    }}>
                    <Link to="/rental">Zapisz</Link>
                </Button>
            </div>
        </Page>
    )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Product));
