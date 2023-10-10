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
      6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 44, 48, 60, 72, 96,
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
              value={size}
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
