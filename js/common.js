// 根据ID获取DOM节点
function $(id) {
	return document.getElementById(id);
}
// 碰撞检测函数
function pz(obj1, obj2) {
	var
		iW1 = obj1.offsetWidth,
		iH1 = obj1.offsetHeight,
		iL1 = obj1.offsetLeft,
		iT1 = obj1.offsetTop,
		iW2 = obj2.offsetWidth,
		iH2 = obj2.offsetHeight,
		iL2 = obj2.offsetLeft,
		iT2 = obj2.offsetTop;

	if(iW1 + iL1 <= iL2 || iT1 + iH1 <= iT2 || iL2 + iW2 <= iL1 || iT2 + iH2 <= iT1) {
		return false;
	} else {
		return true;
	}
}