////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////URLParams////////////////////////////////////
/*//////////////////////////////////////////////////////////////////////////////

StackBlitz: url-params.stackblitz.io by Adrian Gjerstad

*///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Library/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
let URLParams = {};

// EVERYTHING FROM HERE TO ALIAS CREATION SHOULD START WITH URLParams!
URLParams.system_ = {};

// Variables
URLParams.MODE_HREF = window.location.href;
URLParams.MODE_SEARCH = window.location.search;

// Set this value to true to use shorthand (~) instead of full (URLParams.~).
URLParams.system_.createAliases = false;
URLParams.system_.mode = window.location.href;
URLParams.system_.params = null;

// Functions
URLParams.setMode = function(mode) {
  if(mode === (URLParams.MODE_HREF || URLParams.MODE_SEARCH)) {
    URLParams.system_.mode = mode;
  } else {
    throw new ReferenceError("mode is not one of MODE_HREF or MODE_SEARCH.");
  }
}

String.prototype.replaceAll(search, replacement) {
  let target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
}

URLParams.readURLData = function() {
  if(window.location.href.indexOf("?") != -1) {
    try {
      let urldata = window.location.search;
      let name_value_pairs = null;
      let parsedData = [];

      if(URLParams.system_.mode === URLParams.MODE_HREF) {
        urldata = window.location.href.substr(
          window.location.href.indexOf("?"));
      }

      // Web url escape code replacements
      // Invalid ASCII control characters
      urldata = urldata.replaceAll("%20", " ");
      urldata = urldata.replaceAll("%21", "!");
      urldata = urldata.replaceAll("%22", "\"");
      urldata = urldata.replaceAll("%23", "#");
      urldata = urldata.replaceAll("%24", "$");
      // % is the escape character for urls. hence this special case, fixed afterwards below
      //urldata = urldata.replaceAll("%26", "&");
      urldata = urldata.replaceAll("%27", "\'");
      urldata = urldata.replaceAll("%28", "(");
      urldata = urldata.replaceAll("%29", ")");
      urldata = urldata.replaceAll("%2A", "*");
      urldata = urldata.replaceAll("%2B", "+");
      urldata = urldata.replaceAll("%2C", ",");
      urldata = urldata.replaceAll("%2D", "-");
      urldata = urldata.replaceAll("%2E", ".");
      urldata = urldata.replaceAll("%2F", "/");
      // Alphanumeric codeblock #1
      urldata = urldata.replaceAll("%3A", ":");
      urldata = urldata.replaceAll("%3B", ";");
      urldata = urldata.replaceAll("%3C", "<");
      //urldata = urldata.replaceAll("%3D", "=");
      urldata = urldata.replaceAll("%3E", ">");
      //urldata = urldata.replaceAll("%3F", "?");
      urldata = urldata.replaceAll("%40", "@");
      // Alphanumeric codeblock #2
      urldata = urldata.replaceAll("%5B", "[");
      urldata = urldata.replaceAll("%5C", "\\");
      urldata = urldata.replaceAll("%5D", "]");
      urldata = urldata.replaceAll("%5E", "^");
      urldata = urldata.replaceAll("%5F", "_");
      urldata = urldata.replaceAll("%60", "`");
      // Alphanumeric codeblock #3
      urldata = urldata.replaceAll("%7B", "{");
      urldata = urldata.replaceAll("%7C", "|");
      urldata = urldata.replaceAll("%7D", "}");
      urldata = urldata.replaceAll("%7E", "~");
      // Invalid character anyways

      // URL escape character
      urldata = urldata.replaceAll("%25", "%");

      urldata = urldata.substring(1); // NOTE: Cut off '?'

      name_value_pairs = urldata.split("&");

      for(let i = 0; i < name_value_pairs.length; ++i) {
        parsedData.push(name_value_pairs[i].split("="));
      }

      URLParams.system_.params = parsedData; // Data structure:
      /*
      [
        ["foo", "123"],
        ["bar", "456"],
        ["baz", "789"]
      ]

      from .../?foo=123&bar=456&baz=789
      */
    } catch(e) {
      throw new URIError(
        "could not determine structure of current window location: " +
        e.message);
    }
  } else {
    URLParams.system_.params = [];
  }
}

URLParams.getParam = function(key) {
  if(typeof(key) == 'string' && URLParams.system_.params !== null) {
    for(let i = 0; i < URLParams.system_.params.length; ++i) {
      if(URLParams.system_.params[i][0] == key) {
        return new String(URLParams.system_.params[i][1]);
        // NOTE: Duplicate string
      }
    }
  }

  return "";
}

URLParams.getParamList = function() {
  return URLParams.system_.params.slice(0); // NOTE: Duplicate array
}

// ALIAS ASSIGNMENT

if(URLParams.system_.createAliases) {
  window.MODE_HREF = URLParams.MODE_HREF;
  window.MODE_SEARCH = URLParams.MODE_SEARCH;

  window.setMode = URLParams.setMode;
  window.readURLData = URLParams.readURLData;
  window.getParam = URLParams.getParam;
  window.getParamList = URLParams.getParamList;
}

//exports.URLParams = URLParams;

