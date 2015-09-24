'use strict';

function filterClasses(classList, exclusiveList, ignoreList, ignoreExpression, strictExclusiveMode) {
	var className;
	var newClassList = {};

	if (exclusiveList && strictExclusiveMode) {
		for (var e = 0; e < exclusiveList.length; e += 1) {
			className = exclusiveList[e];

			if (classList[className]) {
				newClassList[className] = classList[className][0];
			}
		}
	} else {
		for (className in classList) {
			newClassList[className] = classList[className][0];
		}
	}

	if (ignoreList) {
		for (var i = 0; i < ignoreList.length; i += 1) {
			className = ignoreList[i];
			if (newClassList[className]) {
				delete newClassList[className];
			}
		}
	}

	if (ignoreExpression) {
		for (className in newClassList) {
			if (className.match(ignoreExpression)) {
				delete newClassList[className];
			}
		}
	}

	// For all class names in newClassList, we make sure they start with the indicated pattern exclusiveList
	if (exclusiveList && !strictExclusiveMode)
	{
		for (className in newClassList) {
			var classNameIsValid = false;
			for (var j = 0; j < exclusiveList.length; j++) {
				if (className.indexOf(exclusiveList[j]) != -1) {
					classNameIsValid = true;
					break;
				}
			}

			if (!classNameIsValid)
				delete newClassList[className];
		}
	}

	return newClassList;
}
module.exports = filterClasses;