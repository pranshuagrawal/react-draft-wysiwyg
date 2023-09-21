import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

import { stopPropagation } from "../../../utils/common";

export default class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    optionWrapperClassName: PropTypes.string,
    ariaLabel: PropTypes.string,
    title: PropTypes.string,
  };

  state = {
    highlighted: -1,
  };

  componentDidUpdate(prevProps) {
    const { expanded } = this.props;
    if (prevProps.expanded && !expanded) {
      this.setState({
        highlighted: -1,
      });
    }
  }

  onChange = (value) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.toggleExpansion();
  };

  setHighlighted = (highlighted) => {
    this.setState({
      highlighted,
    });
  };

  toggleExpansion = () => {
    const { doExpand, doCollapse, expanded } = this.props;
    if (expanded) {
      doCollapse();
    } else {
      doExpand();
    }
  };

  render() {
    const {
      expanded,
      children,
      className,
      optionWrapperClassName,
      ariaLabel,
      onExpandEvent,
      title,
    } = this.props;
    const { highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        className={classNames("rdw-dropdown-wrapper", className)}
        aria-expanded={expanded}
        aria-label={ariaLabel || "rdw-dropdown"}
      >
        <a
          className="rdw-dropdown-selectedtext"
          onClick={onExpandEvent}
          title={title}
        >
          {children[0]}
          <div
            // className={classNames({
            //   "rdw-dropdown-carettoclose": expanded,
            //   "rdw-dropdown-carettoopen": !expanded,
            // })}
            style={{
              position: "absolute",
              top: "4px",
              right: "5px",
            }}
          >
            <svg
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                d="M1.27634 6.13017C1.42279 5.95661 1.66022 5.95661 1.80667 6.13017L4.1665 8.92702L6.52634 6.13017C6.67279 5.95661 6.91022 5.95661 7.05667 6.13017C7.20312 6.30374 7.20312 6.58515 7.05667 6.75871L4.43167 9.86983C4.28522 10.0434 4.04779 10.0434 3.90134 9.86983L1.27634 6.75871C1.12989 6.58515 1.12989 6.30374 1.27634 6.13017Z"
                fill="#4D4D4D"
              />
            </svg>
          </div>
        </a>
        {expanded ? (
          <ul
            className={classNames(
              "rdw-dropdown-optionwrapper",
              optionWrapperClassName
            )}
            onClick={stopPropagation}
          >
            {React.Children.map(options, (option, index) => {
              const temp =
                option &&
                React.cloneElement(option, {
                  onSelect: this.onChange,
                  highlighted: highlighted === index,
                  setHighlighted: this.setHighlighted,
                  index,
                });
              return temp;
            })}
          </ul>
        ) : undefined}
      </div>
    );
  }
}
