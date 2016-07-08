/**
 * Created by Administrator on 2014/10/22.
 */
function SiteCtrl($scope, $http, $sce) {
    // selectItem;
    // selectItem2;
    $http.get('datas/site.json').success(function(data)
    {
        for(var i in data.menus)
        {
            var item = data.menus[i];
            if(typeof item.content == "string")
            {
                item.isSimple = true;
                item.content = $sce.trustAsHtml(item.content);
            }else
            {
                for(var j in item.content)
                {
                    var itemJ = item.content[j];
                    itemJ.content = $sce.trustAsHtml(itemJ.content);
                }
            }
        }

        $scope.result = data;
        $scope.$select(0);
    });

    $scope.$select = function(data) {
        var item = $scope.result.menus[data];
        $scope.selectItem = item;

        if( !item.isSimple)
        {
            $scope.$select2(0);
        }
    };

    $scope.$select2 = function(data) {
        var itemJ= $scope.selectItem.content[data];
        $scope.selectItem2 = itemJ;
    };
}