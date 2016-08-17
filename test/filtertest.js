describe('Filters',function(){
    beforeEach(module('myApp'));
    describe('reverse',function(){
        var reverse;
        beforeEach(inject(function($filter){
            reverse=$filter('reverse',{});
        
        }));
        
        it("should reverse string",function(){
                expect(reverse('abcd')).toBe('dcba');
        
        })
    
    });
    



});
describe('aa',function(){
    describe('bb',function(){
    
        it('should init title in the scope',function(){
                module('myApp');
            var scope={};
            var ctrl;
            inject(function($controller){
                ctrl = $controller('HailRawDataController',{$scope:scope});
            
            });
            expect(scope.title).toBeDefined();
            expect(scope.title).toBe('this is a test');
        
        });
    
    });

});