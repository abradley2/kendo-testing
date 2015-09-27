function getTeamListDS(){
  var teamModel = {

  };

  var teamListDS = new kendo.data.DataSource({

    schema: {
      model: teamModel
    }

  });

  return teamListDS;
}

module.exports = getTeamListDS;
