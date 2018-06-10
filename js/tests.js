/* Basic check 
*/
//MainApp
QUnit.test("App working", function( assert ) {
	assert.ok(App,"App working")
});
QUnit.test("FormatValueHelper defined", function( assert ) {
	assert.ok(App.FormatValueHelper,"FormatValueHelper is defined")
});

//Main controller
QUnit.test("App.IndexController ok", function( assert ) {
	assert.ok(App.IndexController,"App.IndexController is defined")
});
//loadPeople
QUnit.test("loadPeople ok", function( assert ) {
	assert.ok(loadPeople,"loadPeople is defined")
});

QUnit.test("loadPeople is a function", function( assert ) {
	assert.ok(typeof loadPeople === 'function',"loadPeople is a function")
});

//loadStarship
QUnit.test("loadStarShip ok", function( assert ) {
	assert.ok(loadStarShip,"loadStarShip is defined")
});
QUnit.test("loadStarShip is a function", function( assert ) {
	assert.ok(typeof loadStarShip === 'function',"loadStarShip is a function")
});

//loadData
QUnit.test("loadData ok", function( assert ) {
	assert.ok(loadData,"loadData is defined")
});
QUnit.test("loadData is a function", function( assert ) {
	assert.ok(typeof loadData === 'function',"loadData is a function")
});

//startGame
QUnit.test("startGame ok", function( assert ) {
	assert.ok(startGame,"startGame is defined")
});
QUnit.test("startGame is a function", function( assert ) {
	assert.ok(typeof startGame === 'function',"startGame is a function")
});

//checkWinner
QUnit.test("checkWinner ok", function( assert ) {
	assert.ok(checkWinner,"checkWinner is defined")
});
QUnit.test("checkWinner is a function", function( assert ) {
	assert.ok(typeof checkWinner === 'function',"checkWinner is a function")
});

