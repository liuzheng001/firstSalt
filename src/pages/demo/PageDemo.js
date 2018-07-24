import { Component } from 'refast';
import {Group, Button, IconSetting, IconButton, TextButton, ButtonGroup, Dialog} from 'saltui';

import List from 'components/list';
import Info from 'components/info';
import logic from './logic';
import './PageDemo.less';

class Demo extends React.Component {
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

    render() {
        return (
            <div style={{ backgroundColor: '#f8f8f8' }}>
                <h1>按钮 Button</h1>

                <div className="demo-section">
                    <h2 className="section-title">标准按钮</h2>
                    <div className="section-content">
                        <Button type="primary" onClick={this.handleClick}>一级按钮</Button>
                        <br />
                        <Button type="secondary" onClick={this.handleClick}>二级按钮</Button>
                        <br />
                        <Button type="minor" onClick={this.handleClick}>次要按钮</Button>
                        <br />
                        <Button type="danger">警示按钮</Button>
                        <br />
                        <Button loading>加载中</Button>
                        <br />
                        <Button disabled>失效按钮</Button>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default class Page extends Component {

  constructor(props) {
    super(props, logic);
  }

  componentDidMount() {
    this.handleClick('1234');
  }

  handleClick(workNo) {
    this.dispatch('fetch', { workNo });
  }

  render() {
    const t = this;
    const { list = [], error } = t.state;
    const Tag = list && list.length ? List : Info;

    return (
      <div className="page-demo">
        <Group>
          <Group.Head>DEMO</Group.Head>
          <Group.List lineIndent={15} itemIndent={15}>
            <Tag
              list={list}
              error={error}
              onClick={t.handleClick.bind(t)}
            />
          </Group.List>
        </Group>
      <Demo/>
      </div>
    );
  }
}
