import { Component } from 'react';

import { Toast, Button, Dialog,Popup,Popover ,Avatar} from 'saltui';

import './PageHome.less';

class TestDialog extends React.Component{

    handleClick(evt) {
        console.log(this, evt.target); // eslint-disable-line
        Dialog.alert({
            title: '测试',

            content: '我是 Dialog.alert 的调用',
            onConfirm() {
                console.log('alert confirm');
            },
        });

    }

    handleConfirm(e){
        Dialog.confirm({
            title: '测试',
            content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
            onConfirm() {
                console.log('confirm confirm');
            },
            onCancel() {
                console.log('confirm cancel');
            }
        });
        }



    render(){
        return(
        <div>
            {/*直接显示alert ,未成功,不能关闭
            <Dialog title="Absolute Alert" onConfirm={() => {this.setState({showAlert: false})}}>
                我是直接通过父 state 控制的模态窗口 alert, 我没有 onCancel 回调
            </Dialog>*/}
            <Button onClick={this.handleClick}>打开alert</Button>
            <Button type="secondary" onClick={this.handleConfirm}>打开confirm</Button>
        </div>
        );
    }
}

class TestPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: 1,
            visible: false,
        };
    }

    getContent() {
        const content = (
            <div className="demo-popup-container-2">
                <input
                    value={this.state.keyword}
                    onChange={(e) => {
                        this.setState({ keyword: e.target.value }, () => {
                            this.instance.update(this.getContent());
                        });
                    }}
                />
            </div>
        );
        return content;
    }

    render() {
        return (
            <div className="testPopup">
                <Button onClick={() => {
                    Popup.show(<div className="demo-popup-container">我是弹出层<br/><br/><br/><br/><br/><br/><br/><br/><br/></div>, {
                        animationType: 'slide-up',
                    });
                }}
                >默认向上划出</Button>
                <Button onClick={() => {
                    Popup.show(<div className="demo-popup-container">我是弹出层</div>, {
                        animationType: 'slide-down',
                    });
                }}
                >向下划出</Button>
                <Button onClick={() => {
                    Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
                        animationType: 'slide-right',
                    });
                }}
                >向右划出</Button>
                <Button onClick={() => {
                    Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
                        animationType: 'slide-left',
                    });
                }}
                >向左划出</Button>
                <Popup
                    content={
                        <div>
                            <input
                                value={this.state.keyword}
                                onChange={(e) => { this.setState({ keyword: e.target.value }); }}
                            />
                            <Button onClick={() => { this.setState({ visible: false }); }}>关闭 Popup</Button>
                        </div>
                    }
                    animationType="slide-down"
                    onMaskClick={() => { this.setState({ visible: false }); }}
                    visible={this.state.visible}
                >
                    {null}
                </Popup>
            </div>
        );
    }
}

const avatarColors = ['#78C06E', '#3BC2B5', '#78919D', '#5EC9F6', '#F6BF26'];


export default class PageHome extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showAlert: true,
            showConfirm: false,
            showMultiBtns: false,
            showMultiBtnsVertical: false,
            showTransBg: false,
            showNoPadding: false,
            text: '测试文本',
        };
    }

    handleAlert(evt) {
        console.log(this, evt.target); // eslint-disable-line
        Dialog.alert({
            title: '测试',

            content: '我是 Dialog.alert 的调用',
            onConfirm() {
                console.log('alert confirm');
            },
        });

    }



  handleClick(options) {
    Toast.show(options);
  }

  handleLink() {
    location.hash = 'demo';
  }

  handleLink2() {
    location.hash = 'ding';
  }



  handlePush() {
    window.salt.router.push({
      id: 'popwin',
      url: './popwin.html',
      anim: 2,
      needPost: true,
      param: {
        foo: 1,
        bar: 2,
      },
    }).then().catch((e) => {
      if (e.errorCode === 1001) {
        location.href = './popwin.html';
      }
    });
  }

  render() {
    const t = this;
    return (

      <div className="page-home">

          <div>

              <TestDialog/>
          </div>

            <div className="t-PL10 t-PR10 t-PT10">
            <Popover overlayClassName="t-popover-demo" placement="left" overlay="come on">
                  <Button type="primary" onClick={t.handleClick.bind(t, {
                    type: 'success',
                    content: 'You clicked',
                  })}
                  >点我</Button>
            </Popover>

            </div>
            <div className="t-PL10 t-PR10 t-PT10">
              <Button type="secondary" onClick={t.handlePush.bind(t)}>Pop new window</Button>
            </div>
            <div className="t-PL10 t-PR10 t-PT10">
              <Button type="secondary" onClick={t.handleLink}>Demo</Button>
            </div>
            <div className="t-PL10 t-PR10 t-PT10">
              <Button type="secondary" onClick={t.handleLink2.bind(t)}>DingTalk</Button>
            </div>
            <div>
                <Button  type="danger" onClick={t.handleAlert}>打开alert</Button>
            </div>
              <div>
                  <TestPopup/>
              </div>
          <div className="t-FBH">
                    {/*<Avatar name="tingle" colors={avatarColors} /> */}
                    <Avatar name="天晟" colors={avatarColors} />
                    <Avatar name="马天" colors={avatarColors} />
                    {/*<Avatar name="欧阳夏丹" colors={avatarColors} />*/}

                    <Avatar name="钉钉" colors={avatarColors} />
              <Avatar src="https://img.alicdn.com/tps/TB1amOaKpXXXXbsXVXXXXXXXXXX-144-144.png" />

              <Avatar name="马明" defaultColor={'#000'} />
                </div>
      </div>
    );
  }
}

