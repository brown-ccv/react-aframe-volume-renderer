import ScrollAnim from 'rc-scroll-anim';
import React from 'react';

import '../assets/slideshow.css';

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const EventListener = ScrollAnim.Event;

export default class ScrollNavigation extends React.Component {
  constructor(props) {
    super(props);  
    
    this.state = {
      map_autoplay: false
    };
  }
  
  componentDidMount() {
    EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this));
  }

  // onFocus = (e) => {
  //   console.log(e, 'focus');
  //   this.dom = e.target;
  //   this.barAnimate();
  // }

  // onFocusMap = (e) => {
  //   console.log(e, 'focusMap');
  //   this.dom = e.target;
  //   this.barAnimate();
  //   this.setState({ map_autoplay: true})
  // }

  // onBlur = (e) => {
  //   console.log(e, 'blur');
  // }

  // onBlurMap = (e) => {
  //   console.log(e, 'blurMap');
  //   this.setState({ map_autoplay: false})
  // }

  // onChange = (e) => {
  //   console.log(e);
  //   if (e.id === "map"){
  //     if (e.mode === "enter"){
  //       this.setState({ map_autoplay: true})
  //     }else{
  //       this.setState({ map_autoplay: false})
  //     }
  //   }
  // }


  // barAnimate = () => {
  //   if (!this.dom) {
  //     return;
  //   }
  //   const bar = this.refs.bar;
  //   bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
  // }

  render() {
    // return (<div>
    //     <div className="nav">
    //       <div className="nav-wap">
    //         <Link className="nav-list" to="home"
    //           onFocus={this.onFocus}
    //           onBlur={this.onBlur}
    //         >
    //           Home
    //         </Link>
    //         <Link className="nav-list" to="map"
    //           onFocus={this.onFocusMap}
    //           onBlur={this.onBlurMap}
    //         >
    //           Map
    //         </Link>
    //         <Link className="nav-list" to="about"
    //           onFocus={this.onFocus}
    //           onBlur={this.onBlur}
    //         >
    //           About
    //         </Link>
    //         <div ref="bar" className="nav-bar" />
    //       </div>
    //     </div>
    //     <Element id="home" onChange={this.onChange}>
    //       <div className = "banner-title">
    //         <div className="banner-page-title" key="title">
    //           <img src={BrownLogo} alt="Brown University" className="brown-logo"></img>
    //           <img src={NIHLogo} alt="National Institute of Health" className="nih-logo"></img>
    //           <p>Socio Ecological City Project</p>
    //         </div>
    //       </div>
    //       <div className = "slideshow">
    //         <li>
    //           <h3>1951</h3>
    //           <span>1951</span>
    //         </li>
    //         <li>
    //           <h3>1997</h3>
    //           <span>1997</span>
    //         </li>
    //         <li>
    //           <h3>2016</h3>
    //           <span>2016</span>
    //         </li>
    //       </div>
    //     </Element>
    //     <Element className="dark-page" id="map" onChange={this.onChangeMap}>
    //       <TimeMap autoplay={this.state.map_autoplay}/>
    //     </Element>
    //     <Element className="light-page" id="about" onChange={this.onChange}>
    //         <div className="home-title">
    //             <div className="light-page-title" key="title">
    //                 <p>The Socio-Ecological City Project</p>
    //             </div>
    //             <div className="light-page-description" key="c">
    //                 <p>yurt is king</p>
    //             </div>
    //         </div>
    //     </Element>
    //   </div>);
    
    return (
      <div>
        <div className="nav">
          <Link className="nav-list" to="page0">nav0</Link>
          <Link className="nav-list" to="page1">nav1</Link>
        </div>
        <Element className="pack-page" id="page0">demo</Element>
        <Element className="pack-page" id="page1">demo</Element>
      </div>
    );
  }
}