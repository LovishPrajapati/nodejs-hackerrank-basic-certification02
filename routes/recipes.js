var recipes = require('../recipes.json');
var router = require('express').Router();

router.get('/:id', (req,res) => {
    console.log(req)
    let id = req.params.id;
    let elapsedTime = req.query.elapsedTime || 0;
    function getIndex(timers , elapsedTime){
  for(let i=0; i < timers.length ; i++) {
   if(timers[i] >= elapsedTime) {
     return i;
   }
  }
}
    console.log(id)
    console.log(elapsedTime)

    if(isNaN(id)){
    res.status(400).send('NOT_FOUND');
    return;
  }

  const selectedRecipe = recipes.filter(recipe => {
    return recipe.id === Number(id)
  });

  if(selectedRecipe) {
    const { timers } = selectedRecipe[0];
    const index = getIndex(timers, elapsedTime);
    res.status(200).send({index});
    return;
  } else {
    res.status(404).send('NOT_FOUND');
    return;
  }


})

module.exports = router;

