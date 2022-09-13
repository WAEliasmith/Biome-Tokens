var GetURL = {
    
    GetURLFromPage: function () {
        var returnStr = window.top.location.href;
        var buffer = _malloc(lengthBytesUTF8(returnStr) + 1);
        writeStringToMemory(returnStr, buffer);
        return buffer;
    }
};

mergeInto(LibraryManager.library, GetURL);