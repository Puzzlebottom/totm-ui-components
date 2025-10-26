import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui, TamaguiProvider, withStaticProperties, createStyledContext, styled, View, Text, useTheme } from 'tamagui';
import { jsx } from 'react/jsx-runtime';
import { useContext, cloneElement, isValidElement } from 'react';

const config = createTamagui({ ...defaultConfig, settings: { onlyAllowShorthands: false, } });

/**
 * UI Provider for totm-ui-components
 * Wraps the base UI library provider
 */
const UIProvider = ({ children, defaultTheme = 'light' }) => {
    return jsx(TamaguiProvider, { config: config, defaultTheme: defaultTheme, children: children });
};

var MISSING_THEME_MESSAGE = process.env.NODE_ENV === "development" ? `Can't find Tamagui configuration.
    
99% of the time this is due to having mis-matched versions of Tamagui dependencies.
Ensure that every "tamagui" and "@tamagui/*" dependency is pinned to exactly the same version.

We have a CLI tool to help check this: 

  npx @tamagui/cli check
` : "Missing theme.";

var conf,
  haventCalledErrorMessage = process.env.NODE_ENV === "development" ? `
Haven't called createTamagui yet. ${MISSING_THEME_MESSAGE}
` : "\u274C Error 001",
  tokensMerged;
var getTokens = function () {
    var {
      prefixed
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (
    /**
    * Force either with $ or without $ prefix
    */
    {});
    if (process.env.NODE_ENV === "development" && !conf) throw new Error(haventCalledErrorMessage);
    var {
      tokens,
      tokensParsed
    } = conf;
    return prefixed === false ? tokens : prefixed === true ? tokensParsed : tokensMerged;
  };

function isVariable(v) {
  return v && typeof v == "object" && "isVar" in v;
}

var defaultOptions = {
    shift: 0,
    bounds: [0]
  },
  getSize = function (size, options) {
    return getTokenRelative("size", size, options);
  },
  getSpace = function (space, options) {
    return getTokenRelative("space", space, options);
  },
  cacheVariables = {},
  cacheWholeVariables = {},
  cacheKeys = {},
  cacheWholeKeys = {},
  stepTokenUpOrDown = function (type, current) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultOptions,
      _options_bounds,
      _options_bounds1,
      tokens = getTokens({
        prefixed: true
      })[type];
    if (!(type in cacheVariables)) {
      cacheKeys[type] = [], cacheVariables[type] = [], cacheWholeKeys[type] = [], cacheWholeVariables[type] = [];
      var sorted = Object.keys(tokens).map(function (k) {
          return tokens[k];
        }).sort(function (a, b) {
          return a.val - b.val;
        }),
        _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = void 0;
      try {
        for (var _iterator = sorted[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var token = _step.value;
          cacheKeys[type].push(token.key), cacheVariables[type].push(token);
        }
      } catch (err) {
        _didIteratorError = true, _iteratorError = err;
      } finally {
        try {
          !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
        } finally {
          if (_didIteratorError) throw _iteratorError;
        }
      }
      var sortedExcludingHalfSteps = sorted.filter(function (x) {
          return !x.key.endsWith(".5");
        }),
        _iteratorNormalCompletion1 = true,
        _didIteratorError1 = false,
        _iteratorError1 = void 0;
      try {
        for (var _iterator1 = sortedExcludingHalfSteps[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
          var token1 = _step1.value;
          cacheWholeKeys[type].push(token1.key), cacheWholeVariables[type].push(token1);
        }
      } catch (err) {
        _didIteratorError1 = true, _iteratorError1 = err;
      } finally {
        try {
          !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
        } finally {
          if (_didIteratorError1) throw _iteratorError1;
        }
      }
    }
    var isString = typeof current == "string",
      cache = options.excludeHalfSteps ? isString ? cacheWholeKeys : cacheWholeVariables : isString ? cacheKeys : cacheVariables,
      tokensOrdered = cache[type],
      _options_bounds_,
      min = (_options_bounds_ = (_options_bounds = options.bounds) === null || _options_bounds === void 0 ? void 0 : _options_bounds[0]) !== null && _options_bounds_ !== void 0 ? _options_bounds_ : 0,
      _options_bounds_1,
      max = (_options_bounds_1 = (_options_bounds1 = options.bounds) === null || _options_bounds1 === void 0 ? void 0 : _options_bounds1[1]) !== null && _options_bounds_1 !== void 0 ? _options_bounds_1 : tokensOrdered.length - 1,
      currentIndex = tokensOrdered.indexOf(current),
      shift = options.shift || 0;
    shift && (current === "$true" || isVariable(current) && current.name === "true") && (shift += shift > 0 ? 1 : -1);
    var index = Math.min(max, Math.max(min, currentIndex + shift)),
      found = tokensOrdered[index],
      result = (typeof found == "string" ? tokens[found] : found) || tokens.$true;
    return result;
  },
  getTokenRelative = stepTokenUpOrDown;

const ButtonContext = createStyledContext({
    size: '$4',
    variant: 'primary',
});
const ButtonFrame = styled(View, {
    name: 'Button',
    context: ButtonContext,
    backgroundColor: '$background',
    justify: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    hoverStyle: {
        backgroundColor: '$backgroundHover',
    },
    pressStyle: {
        backgroundColor: '$backgroundPress',
    },
    variants: {
        size: {
            '...size': (name, { tokens }) => {
                return {
                    height: tokens.size[name],
                    borderRadius: tokens.radius[name],
                    gap: tokens.space[name].val * 0.2,
                    paddingHorizontal: getSpace(name, {
                        shift: -1,
                    }),
                };
            },
        },
        variant: {
            primary: {
                backgroundColor: '$blue10',
                hoverStyle: {
                    backgroundColor: '$blue9',
                },
                pressStyle: {
                    backgroundColor: '$blue11',
                },
            },
            secondary: {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '$borderColor',
                hoverStyle: {
                    backgroundColor: '$backgroundHover',
                },
                pressStyle: {
                    backgroundColor: '$backgroundPress',
                },
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '$blue10',
                hoverStyle: {
                    backgroundColor: '$blue2',
                },
                pressStyle: {
                    backgroundColor: '$blue3',
                },
            },
        },
    },
    defaultVariants: {
        size: '$4',
        variant: 'primary',
    },
});
const ButtonText = styled(Text, {
    name: 'ButtonText',
    context: ButtonContext,
    color: '$color',
    fontFamily: '$body',
    fontWeight: '700',
    variants: {
        size: {
            '...fontSize': (name, { font }) => ({
                fontSize: font?.size[name],
            }),
        },
        variant: {
            primary: {
                color: 'white',
            },
            secondary: {
                color: '$color',
            },
            outline: {
                color: '$blue10',
            },
        },
    },
});
const ButtonIcon = (props) => {
    const { size } = useContext(ButtonContext.context);
    const smaller = getSize(size, {
        shift: -2,
    });
    const theme = useTheme();
    return isValidElement(props.children)
        ? cloneElement(props.children, {
            size: smaller.val * 0.5,
            color: theme.color.get(),
        })
        : null;
};
const Button = withStaticProperties(ButtonFrame, {
    Props: ButtonContext.Provider,
    Text: ButtonText,
    Icon: ButtonIcon,
});

export { Button, ButtonContext, ButtonFrame, ButtonText, UIProvider, config };
//# sourceMappingURL=index.esm.js.map
