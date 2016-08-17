var app = angular.module('myApp');
app.service("ClaimRawDataService",['DBService','$q',function(DBService,$q){
    
    var requestClaimData = function(){
        return $q(function(resolve, reject){
            var ClaimRawData=[];
            var AveClaim=[];
            var code=[];
            var data=[];
            var CriteriaData={"State":[],"Education":[],"ClaimAmount":[],"MaritalStatus":[],"EmploymentStatus":[],"Gender":[]};
            var Catagories = [
                                {key:'State', desc: "State" },
                                {key:'Education', desc: "Education"},
                                {key:"ClaimAmount", desc:"Claim Amount"},
                                {key:"MaritalStatus", desc:"Marital Status"},
                                {key:"EmploymentStatus", desc: "EmploymentStatus" },
                                {key:"Gender", desc: "Gender"}];
            DBService.getClaimRawData.then(function(response){
                 //ClaimRawData=[];
                 response.forEach( function( item,index ) {  
                            ClaimRawData.push({
                                "No": index + 1, 
                                "State": item.State,
                                "Code":item["State Code"],
                                "ClaimAmount": Number(item["Claim Amount"].toFixed(2)),
                                "TotalClaimAmount":Number(item["Total Claim Amount"].toFixed(2)),
                                "Education":item.Education,
                                "EmploymentStatus":item.EmploymentStatus,
                                "Gender":item.Gender,
                                "Income":item.Income,
                                "MaritalStatus":item["Marital Status"],
                                "PolicyType":item["Policy Type"],
                                "Policy":item.Policy,
                                "ClaimReason":item["Claim Reason"]

                                });	
                        });
                // console.log(ClaimRawData);
                 Catagories.forEach(function(item,index){
                        var arr=[];
                        var j=0;
                        for (var i = 0; i < ClaimRawData.length; i++) {
                            if($.inArray(ClaimRawData[i][item.key],arr)<0){
                                arr[j]=ClaimRawData[i][item.key];
                                j++;
                            }
                        };
                        for(var i=0;i<arr.length;i++){
                            CriteriaData[item.key].push({key: i, desc: arr[i]});
                            //console.log(CriteriaData[item.key]);
                        };

                    });
                    //put each state claim data to myData,each element of myData repesent a unique state(like myData[k])
                    var myData=[];
                    for(var i=0;i<CriteriaData.State.length;i++){
                        myData[i]=[];
                    }
                    var k=0;
                    ClaimRawData.forEach(function(item,index){
                        for(k=0;k<CriteriaData.State.length;k++){
                            if(item.State==CriteriaData.State[k].desc){
                               (myData[k]).push({
                                    "State": item.State,
                                    "Code":item.Code,
                                    "Claim":item.ClaimAmount
                                    }); 
                            };
                        };
                    });
                    //console.log(myData);
                    //calculate each state average claimamout to var AveClaim

                    for(var i=0;i<myData.length;i++){
                        var AverageClaim;
                        var Total=0
                        for(var j=0;j<myData[i].length;j++){
                           Total=Total+myData[i][j].Claim;
                       };
                        AverageClaim=Number((Total/(myData[i].length)).toFixed(2));
                        AveClaim.push({
                            State:myData[i][0].State,
                            Code:myData[i][0].Code,
                            AveClaim:AverageClaim});
                        };

                          AveClaim.forEach(function(item){
                           code.push(item.Code);
                           data.push(item.AveClaim);
                          });
            
            var temp={
                getClaimRawData:ClaimRawData,
                getCriteriaData:CriteriaData,
                getCatagories:Catagories,
                getAveClaim:AveClaim,
                getCode:code,
                getData:data
            };
            if(temp) {
                resolve(temp);
            }
            else{
                reject('error');
            }
            });
           
        });
    };
    return {
        requestClaimData:requestClaimData
        
  };
}]);