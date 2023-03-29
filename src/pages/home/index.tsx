import React from 'react';

import './index.scss';
type StateType = {
    dataSource: any[]
    openTranslate: boolean
    openFirst: boolean
}
class Diary extends React.Component<any, StateType> {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            openTranslate: false,
            openFirst: false,
        };
        this.backRef = React.createRef();
    }

    componentDidMount(): void {
        var winWidth = window.innerWidth;
        var ratio = winWidth / 1920;
        var bodyFontSize = Math.max(16 * ratio, 10);
        document.documentElement.style.fontSize = bodyFontSize + 'px';

        this.getList();
    }

    getList() {
        this.setState({
            dataSource: new Array(2).fill('').map((item, index) => {
                return {
                    id: index + 1,
                    openStatus: false,
                    content: this.createRandomChinese(500),
                };
            }),
        });
    }
    
    // 随机汉字
    createRandomChinese(count: number) {
        const start = parseInt('4e00', 16)
        const end = parseInt('9fa5', 16)
        let name = ''
        for(let i = 0; i < count; i++) {
            const cha = Math.floor(Math.random() * (end - start))
            name += '\\u' + (start + cha).toString(16)
        }
        return eval(`'${name}'`)
    }

    handleNext(flag: any) {
        this.setState({
            openTranslate: true,
        });
        if (flag === 'first') {
            this.setState({
                openFirst: true,
            });
        } else {
            this.setState({
                dataSource: this.state.dataSource.map(item => {
                    if (item.id === flag.id) {
                        return {...item, openStatus: true};
                    } else {
                        return item;
                    }
                }),
            });
        }
    }

    handlePre(event: any, flag: any) {
        event.stopPropagation();
        if (flag === 'first') {
            this.setState({
                openTranslate: false,
            });
            this.setState({
                openFirst: false,
            });
        } else {
            this.setState({
                dataSource: this.state.dataSource.map(item => {
                    if (item.id === flag.id) {
                        return {...item, openStatus: false};
                    } else {
                        return item;
                    }
                }),
            });
        }
    }

    render() {
        const {dataSource, openTranslate, openFirst} = this.state;
        return (
            <div className="book_container">
                <div className="v-center"></div>
                <div id="container">
                    <div className={`book ${openTranslate ? 'openTranslate' : ''}`}>
                        <div className={`first paper ${openFirst ? 'open' : ''}`} onClick={() => this.handleNext('first')}>
                            <div
                                className="page front contents"
                                style={{
                                    transform: `translateZ(${dataSource.length + 1}px)`,
                                }}
                            >
                                <div className="intro">
                                    <h2>DIARY</h2>
                                    <h1>这里是日记描述</h1>
                                </div>
                            </div>
                            <div className="page back" onClick={$event => this.handlePre($event, 'first')}></div>
                        </div>

                        {dataSource.map((item: any, index: number) => {
                            return (
                                <div className={`paper ${item.openStatus ? 'open' : ''}`} key={item.id} onClick={() => this.handleNext(item)}>
                                    <div
                                        className="page front contents"
                                        style={
                                            item.openStatus
                                                ? {
                                                      zIndex: index,
                                                  }
                                                : {transform: `translateZ(${dataSource.length - index}px)`, zIndex: index}
                                        }
                                    >
                                        {item.content}
                                    </div>
                                    <div className="page back" style={item.openStatus ? {transform: `translateZ(-${index + 1}px)`} : {}} onClick={$event => this.handlePre($event, item)}></div>
                                </div>
                            );
                        })}

                        <div className="paper contents">
                            <div className="page front contents">
                                <div className="intro">
                                    <h2>没日记了</h2>
                                </div>
                            </div>
                            <div className="page back"></div>
                        </div>

                        <div className="side"></div>
                        <div className="bottom"></div>
                        <div className="shadow"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Diary;
