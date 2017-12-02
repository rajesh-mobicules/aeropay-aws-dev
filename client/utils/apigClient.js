/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
  var apigClient = {};
  if (config === undefined) {
    config = {
      accessKey: '',
      secretKey: '',
      sessionToken: '',
      region: '',
      apiKey: undefined,
      defaultContentType: 'application/json',
      defaultAcceptType: 'application/json'
    };
  }
  if (config.accessKey === undefined) {
    config.accessKey = '';
  }
  if (config.secretKey === undefined) {
    config.secretKey = '';
  }
  if (config.apiKey === undefined) {
    config.apiKey = '';
  }
  if (config.sessionToken === undefined) {
    config.sessionToken = '';
  }
  if (config.region === undefined) {
    config.region = 'us-east-1';
  }
  //If defaultContentType is not defined then default to application/json
  if (config.defaultContentType === undefined) {
    config.defaultContentType = 'application/json';
  }
  //If defaultAcceptType is not defined then default to application/json
  if (config.defaultAcceptType === undefined) {
    config.defaultAcceptType = 'application/json';
  }


  // extract endpoint and path from url
  var invokeUrl = 'https://1ywn2z7wf0.execute-api.us-east-1.amazonaws.com/dev';
  var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
  var pathComponent = invokeUrl.substring(endpoint.length);

  var sigV4ClientConfig = {
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    sessionToken: config.sessionToken,
    serviceName: 'execute-api',
    region: config.region,
    endpoint: endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType
  };

  var authType = 'NONE';
  if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
    authType = 'AWS_IAM';
  }

  var simpleHttpClientConfig = {
    endpoint: endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType
  };

  var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);



  apigClient.addBankAccountPost = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['body', 'requestAuthorization'], ['body']);

    var addBankAccountPostRequest = {
      verb: 'post'.toUpperCase(),
      path: pathComponent + uritemplate('/addBankAccount').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(addBankAccountPostRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.addBankAccountOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var addBankAccountOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/addBankAccount').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(addBankAccountOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.bankAccountForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var bankAccountForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/bankAccountForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(bankAccountForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.bankAccountForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var bankAccountForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/bankAccountForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(bankAccountForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.businessClassificationsGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var businessClassificationsGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/businessClassifications').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(businessClassificationsGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.businessClassificationsOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var businessClassificationsOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/businessClassifications').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(businessClassificationsOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.createBusinessPost = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['body', 'requestAuthorization'], ['body']);

    var createBusinessPostRequest = {
      verb: 'post'.toUpperCase(),
      path: pathComponent + uritemplate('/createBusiness').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(createBusinessPostRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.createBusinessOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var createBusinessOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/createBusiness').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(createBusinessOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.deviceForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['merchantLocationDeviceId', 'requestAuthorization'], ['body']);

    var deviceForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/deviceForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['merchantLocationDeviceId',]),
      body: body
    };


    return apiGatewayClient.makeRequest(deviceForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.deviceForMerchantPut = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['merchantLocationDeviceId', 'requestAuthorization'], ['body']);

    var deviceForMerchantPutRequest = {
      verb: 'put'.toUpperCase(),
      path: pathComponent + uritemplate('/deviceForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['merchantLocationDeviceId',]),
      body: body
    };


    return apiGatewayClient.makeRequest(deviceForMerchantPutRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.deviceForMerchantPost = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization', 'merchantLocationId'], ['body']);

    var deviceForMerchantPostRequest = {
      verb: 'post'.toUpperCase(),
      path: pathComponent + uritemplate('/deviceForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization',]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['merchantLocationId']),
      body: body
    };


    return apiGatewayClient.makeRequest(deviceForMerchantPostRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.deviceForMerchantDelete = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['merchantLocationDeviceId', 'requestAuthorization'], ['body']);

    var deviceForMerchantDeleteRequest = {
      verb: 'delete'.toUpperCase(),
      path: pathComponent + uritemplate('/deviceForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['merchantLocationDeviceId',]),
      body: body
    };


    return apiGatewayClient.makeRequest(deviceForMerchantDeleteRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.deviceForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var deviceForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/deviceForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(deviceForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.devicesForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var devicesForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/devicesForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(devicesForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.devicesForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var devicesForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/devicesForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(devicesForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.iavTokenForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var iavTokenForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/iavTokenForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(iavTokenForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.iavTokenForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var iavTokenForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/iavTokenForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(iavTokenForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.locationForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization', 'merchantLocationId'], ['body']);

    var locationForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/locationForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization',]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['merchantLocationId']),
      body: body
    };


    return apiGatewayClient.makeRequest(locationForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.locationForMerchantPut = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization', 'merchantLocationId'], ['body']);

    var locationForMerchantPutRequest = {
      verb: 'put'.toUpperCase(),
      path: pathComponent + uritemplate('/locationForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization',]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['merchantLocationId']),
      body: body
    };


    return apiGatewayClient.makeRequest(locationForMerchantPutRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.locationForMerchantPost = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization', 'merchantLocationId'], ['body']);

    var locationForMerchantPostRequest = {
      verb: 'post'.toUpperCase(),
      path: pathComponent + uritemplate('/locationForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization',]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['merchantLocationId']),
      body: body
    };


    return apiGatewayClient.makeRequest(locationForMerchantPostRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.locationForMerchantDelete = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization', 'merchantLocationId'], ['body']);

    var locationForMerchantDeleteRequest = {
      verb: 'delete'.toUpperCase(),
      path: pathComponent + uritemplate('/locationForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization',]),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['merchantLocationId']),
      body: body
    };


    return apiGatewayClient.makeRequest(locationForMerchantDeleteRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.locationForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var locationForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/locationForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(locationForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.locationsForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var locationsForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/locationsForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(locationsForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.locationsForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var locationsForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/locationsForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(locationsForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.profileForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var profileForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/profileForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(profileForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.profileForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var profileForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/profileForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(profileForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.retryCreateBusinessPost = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var retryCreateBusinessPostRequest = {
      verb: 'post'.toUpperCase(),
      path: pathComponent + uritemplate('/retryCreateBusiness').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(retryCreateBusinessPostRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.retryCreateBusinessOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var retryCreateBusinessOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/retryCreateBusiness').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(retryCreateBusinessOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.searchTransactionsForMerchantPost = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var searchTransactionsForMerchantPostRequest = {
      verb: 'post'.toUpperCase(),
      path: pathComponent + uritemplate('/searchTransactionsForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(searchTransactionsForMerchantPostRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.searchTransactionsForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var searchTransactionsForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/searchTransactionsForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(searchTransactionsForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.transactionsForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var transactionsForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/transactionsForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(transactionsForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.transactionsForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var transactionsForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/transactionsForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(transactionsForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.uploadDocumentForMerchantPost = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var uploadDocumentForMerchantPostRequest = {
      verb: 'post'.toUpperCase(),
      path: pathComponent + uritemplate('/uploadDocumentForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(uploadDocumentForMerchantPostRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.uploadDocumentForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var uploadDocumentForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/uploadDocumentForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(uploadDocumentForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.userTransactionSummaryForMerchantGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['requestAuthorization'], ['body']);

    var userTransactionSummaryForMerchantGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/userTransactionSummaryForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['requestAuthorization']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(userTransactionSummaryForMerchantGetRequest, authType, additionalParams, config.apiKey);
  };


  apigClient.userTransactionSummaryForMerchantOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    var userTransactionSummaryForMerchantOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/userTransactionSummaryForMerchant').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };


    return apiGatewayClient.makeRequest(userTransactionSummaryForMerchantOptionsRequest, authType, additionalParams, config.apiKey);
  };


  return apigClient;
};
export default apigClientFactory;
