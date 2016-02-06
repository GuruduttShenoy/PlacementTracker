function EmployeeViewModel($scope, $http) {
    //Initializing all  the variables that weintend to use in this controller
    $scope.Employee = {
        "EmployeeID": "",
        "Name": "",
        "Age": "",
        "Address": "",
        "Active": "",
        "ActiveFlag":"",
        "Employment": "",
        "EmploymentType":""
    };

    //Initializing the Employee List in which the resultant of all calls will be stored
    $scope.Employees = {};
    
    //Sets the Acive flag and the Employment type for each of the entries while its loading
    $scope.$watch("Employees", function () {

        for (var x = 0; x < $scope.Employees.length; x++) {

            var emp = $scope.Employees[x];
            emp.ActiveFlag = $scope.getColor(emp.Active);
            emp.EmploymentType = $scope.getEmploymentType(emp.Employment);
        }
    });


    //Function to get the Status based on the value from the database
    $scope.getColor = function (Value) {

        if (Value == 0) {
            return "Red"; // Returns the red flag indicating the person is not actively searching for a job
        }
        else {
            return "Green";   // Returns the red flag indicating the person is actively searching for a job
        }

    }
    
    //Function to get the employment type based on the Employment Type Flag
    $scope.getEmploymentType = function (Value) {
        if (Value == 1)
        {
            return "Permanent";

        }
        else if (Value == 2)
        {
            return "Contract";
        }
        else if (Value == 0)
        {
            return "None";
        }
    }

    //Sets the Active flag based on the value from the database
    $scope.$watch("Employee.Active", function () {
        $scope.Employee.ActiveFlag = $scope.
            getColor($scope.Employee.Active);
    });

    //Sets the Employment type based on the value from database
    $scope.$watch("Employee.Employment", function () {
        $scope.Employee.EmploymentType = $scope.
            getEmploymentType($scope.Employee.Employment);
    });

    $scope.Add = function () {
        // make a call to server to add data
        $http({ method: "POST", data: $scope.Employee, url: "/Api/Employee" }).
            success(function (data, status, headers, config) {
                $scope.Customers = data;
                // Load the collection of customer.
                $scope.Employee = {
                    "EmployeeID": "",
                    "Name": "",
                    "Age": "",
                    "Address": "",
                    "Active": "",
                    "ActiveFlag":"",
                    "EmploymentType": "",
                    "Employment":""
                };
            });
    }
    $scope.Update = function () {
        // make a call to server to add data
        $http({ method: "PUT", data: $scope.Employee, url: "/Api/Employee" }).
            success(function (data, status, headers, config) {
                $scope.Employees = data;
                // Load the collection of Employees.
                $scope.Employee = {
                    "EmployeeID": "",
                    "Name": "",
                    "Age": "",
                    "Address": "",
                    "Active": "",
                    "ActiveFlag": "",
                    "EmploymentType": "",
                    "Employment": ""
                };
            });
    }
    $scope.Delete = function () {
        // make a call to server to delete data
        $http.defaults.headers["delete"] = {
            'Content-Type': 'application/json;charset=utf-8'
        };
        $http({ method: "DELETE", data: $scope.Employee, url: "/Api/Employee" }).
            success(function (data, status, headers, config) {
                $scope.Employees = data;
                // Load the collection of customer.
                $scope.Employee = {
                    "EmployeeID": "",
                    "Name": "",
                    "Age": "",
                    "Address": "",
                    "Active": "",
                    "ActiveFlag": "",
                    "EmploymentType": "",
                    "Employment": ""

                };
            });
    }
    $scope.Load = function () {
        $http({ method: "GET", url: "/Api/Employee" }).
    success(function (data, status, headers, config) {
        $scope.Employees = data;

    });
    }
    //$scope.LoadByName = function () {
    //    $http({
    //        method: "GET",
    //        url: "/Api/Employee?Name=" + $scope.Employee.Name
    //    }).
    //success(function (data, status, headers, config) {
    //    $scope.Employees = data;

    //});
    //}
    $scope.LoadByCode = function (EmployeeID) {
        $http({
            method: "GET",
            url: "/Api/Employee?EmployeeID=" + EmployeeID
        }).
    success(function (data, status, headers, config) {
        $scope.Employees = data;

        $scope.Employee = {
            "EmployeeID": data[0].EmployeeID,
            "Name": data[0].Name,
            "Age": data[0].Age,
            "Address": data[0].Address,
            "Active": data[0].Active,
            "Employment": data[0].Employment
        };

    });


    }
    $scope.Load();
    // App
}