'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATE = exports.STATE = {
  LOADING: 'loading',
  DISABLED: 'disabled',
  SUCCESS: 'success',
  ERROR: 'error',
  NOTHING: ''
};

var ProgressButton = function (_Component) {
  _inherits(ProgressButton, _Component);

  function ProgressButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProgressButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProgressButton.__proto__ || Object.getPrototypeOf(ProgressButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentState: _this.props.state || STATE.NOTHING
    }, _this.handleClick = function (e) {
      if ((_this.props.shouldAllowClickOnLoading || _this.state.currentState !== 'loading') && _this.state.currentState !== 'disabled') {
        _this.props.onClick(e);
      } else {
        e.preventDefault();
      }
    }, _this.loading = function (promise) {
      _this.setState({ currentState: 'loading' });
      if (promise && promise.then && promise.catch) {
        promise.then(function () {
          _this.success();
        }).catch(function () {
          _this.error();
        });
      }
    }, _this.notLoading = function () {
      _this.setState({
        currentState: STATE.NOTHING,
        prevState: _this.state.currentState
      });
    }, _this.enable = function () {
      _this.setState({
        currentState: STATE.NOTHING,
        prevState: _this.state.currentState
      });
    }, _this.disable = function () {
      _this.setState({
        currentState: STATE.DISABLED,
        prevState: _this.state.currentState
      });
    }, _this.success = function (callback, dontRemove) {
      _this.setState({
        currentState: STATE.SUCCESS,
        prevState: _this.state.currentState
      });
      _this._timeout = setTimeout(function () {
        if (!dontRemove) {
          _this.setState({
            currentState: STATE.NOTHING,
            prevState: _this.state.currentState
          });
        }
        callback = callback || _this.props.onSuccess;
        if (typeof callback === 'function') {
          callback();
        }
      }, _this.props.durationSuccess);
    }, _this.error = function (callback) {
      _this.setState({
        currentState: STATE.ERROR,
        prevState: _this.state.currentState
      });
      _this._timeout = setTimeout(function () {
        _this.setState({
          currentState: STATE.NOTHING,
          prevState: _this.state.currentState
        });
        callback = callback || _this.props.onError;
        if (typeof callback === 'function') {
          callback();
        }
      }, _this.props.durationError);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProgressButton, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, state) {
      if (nextProps.state === state.prevState) {
        return;
      }
      var prevState = state.prevState;

      switch (nextProps.state) {
        case STATE.SUCCESS:
          this.success();
          return;
        case STATE.ERROR:
          this.error();
          return;
        case STATE.LOADING:
          this.loading();
          return;
        case STATE.DISABLED:
          this.disable();
          return;
        case STATE.NOTHING:
          this.notLoading();
          return;
        default:
          return;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          classNamespace = _props.classNamespace,
          children = _props.children,
          type = _props.type,
          form = _props.form,
          durationError = _props.durationError,
          durationSuccess = _props.durationSuccess,
          onClick = _props.onClick,
          onError = _props.onError,
          onSuccess = _props.onSuccess,
          state = _props.state,
          shouldAllowClickOnLoading = _props.shouldAllowClickOnLoading,
          containerProps = _objectWithoutProperties(_props, ['className', 'classNamespace', 'children', 'type', 'form', 'durationError', 'durationSuccess', 'onClick', 'onError', 'onSuccess', 'state', 'shouldAllowClickOnLoading']);

      containerProps.className = classNamespace + 'container ' + this.state.currentState + ' ' + className;
      containerProps.onClick = this.handleClick;
      return _react2.default.createElement(
        'div',
        containerProps,
        _react2.default.createElement(
          'button',
          { type: type, form: form, className: classNamespace + 'button' },
          _react2.default.createElement(
            'span',
            null,
            children
          ),
          _react2.default.createElement(
            'svg',
            { className: classNamespace + 'progress-circle', viewBox: '0 0 41 41' },
            _react2.default.createElement('path', { d: 'M38,20.5 C38,30.1685093 30.1685093,38 20.5,38' })
          ),
          _react2.default.createElement(
            'svg',
            { className: classNamespace + 'checkmark', viewBox: '0 0 70 70' },
            _react2.default.createElement('path', { d: 'm31.5,46.5l15.3,-23.2' }),
            _react2.default.createElement('path', { d: 'm31.5,46.5l-8.5,-7.1' })
          ),
          _react2.default.createElement(
            'svg',
            { className: classNamespace + 'cross', viewBox: '0 0 70 70' },
            _react2.default.createElement('path', { d: 'm35,35l-9.3,-9.3' }),
            _react2.default.createElement('path', { d: 'm35,35l9.3,9.3' }),
            _react2.default.createElement('path', { d: 'm35,35l-9.3,9.3' }),
            _react2.default.createElement('path', { d: 'm35,35l9.3,-9.3' })
          )
        )
      );
    }
  }]);

  return ProgressButton;
}(_react.Component);

ProgressButton.propTypes = {
  classNamespace: _propTypes2.default.string,
  durationError: _propTypes2.default.number,
  durationSuccess: _propTypes2.default.number,
  form: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  onSuccess: _propTypes2.default.func,
  state: _propTypes2.default.oneOf(Object.keys(STATE).map(function (k) {
    return STATE[k];
  })),
  type: _propTypes2.default.string,
  shouldAllowClickOnLoading: _propTypes2.default.bool
};
ProgressButton.defaultProps = {
  classNamespace: 'pb-',
  durationError: 1200,
  durationSuccess: 500,
  onClick: function onClick() {},
  onError: function onError() {},
  onSuccess: function onSuccess() {},

  shouldAllowClickOnLoading: false
};
exports.default = ProgressButton;