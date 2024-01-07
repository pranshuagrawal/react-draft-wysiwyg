/* @flow */

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Dropdown, DropdownOption } from "../../../components/Dropdown";
import "./styles.css";

export default class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    defaultFontSize: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName("DraftEditor-root");
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = editorStyles.getPropertyValue("font-size");
      defaultFontSize = defaultFontSize.substring(
        0,
        defaultFontSize.length - 2
      );
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        defaultFontSize,
      });
    }

    const { onChange } = this.props;
    onChange("2em");
    onChange("1.4285714285714286em");
  }

  render() {
    const {
      config: { icon, className, dropdownClassName, options, title },
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
      translations,
    } = this.props;
    const _options = [
      6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60,
      66, 72, 78, 84, 90, 96,
    ];
    let {
      currentState: { fontSize: currentFontSize },
    } = this.props;

    let { defaultFontSize } = this.state;
    defaultFontSize = Number(defaultFontSize);
    currentFontSize =
      currentFontSize ||
      (_options && _options.indexOf(defaultFontSize) >= 0 && defaultFontSize);

    return (
      <div className="rdw-fontsize-wrapper" aria-label="rdw-font-size-control">
        <Dropdown
          className={classNames("rdw-fontsize-dropdown", className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title || translations["components.controls.fontsize.fontsize"]}
        >
          {currentFontSize ? (
            <span>{currentFontSize}</span>
          ) : (
            <img src={icon} alt="" />
          )}
          {_options.map((size, index) => (
            <DropdownOption
              className="rdw-fontsize-option"
              active={currentFontSize === size}
              value={size / 14 + "em"}
              key={index}
            >
              {size}
            </DropdownOption>
          ))}
        </Dropdown>
      </div>
    );
  }
}
