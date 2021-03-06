import React from 'react';
import App from '../src/App.js';
import localStorageMock from '../src/localStorageMock'
import renderer from 'react-test-renderer';

beforeEach(() => {
    localStorageMock.setItem('msal.idtoken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiJjMGZiNzliYS1iNzJjLTQ3YzEtOTEyYy00OGVlNmNiYWM5NzIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNjhiODY1ZDUtY2YxOC00YjJiLTgyYTQtYTRlZGRiOWM1MjM3L3YyLjAiLCJpYXQiOjE1NzMyMTc2NzYsIm5iZiI6MTU3MzIxNzY3NiwiZXhwIjoxNTczMjIxNTc2LCJhaW8iOiJBVFFBeS84TkFBQUFmM2JoT2VMZDllNW1QNXg1WndDQzhBeXB2T1BiZFpndWpoeFEyUHRDR21NaklhM2ZjQnAwcHluRy9jdmE3MHZxIiwibmFtZSI6IkhhbGwsIEVtaWx5IChBc3NvY2lhdGUgU29mdHdhcmUgRGV2ZWxvcGVyKSIsIm5vbmNlIjoiNGUxYzU2YWYtMzdiOC00NmUzLWFkMGEtYzdhZjAzYmEzYTNiIiwib2lkIjoiZDU0ZTM2MjctN2RiNC00MDNhLTg4NzAtNGViZTliMDcyYzE1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZW1pbHkuaGFsbEBza3kudWsiLCJzdWIiOiJLTlhuMVJZUEVadHZoU0dFRWwzYUo5eU52UnVEQ3JvRFpvaWZ2aXdlUEhnIiwidGlkIjoiNjhiODY1ZDUtY2YxOC00YjJiLTgyYTQtYTRlZGRiOWM1MjM3IiwidXRpIjoiMFg4XzFHX193MFduQW9BeDJja19BQSIsInZlciI6IjIuMCJ9.GmP-6FlC9uwA--uYNt0riK_D9RfUwn_ZCU0HUbbzxbmWlUhiAI98rjRzwv7DU5qeYDwVFUhnbZIawnNup1g4shn6Jv2pi5O8un-QqXa8lI20naL8fbN-pQhRTSnsjkZDqhKfDlrCYwnTYkiTQ3EaDRPL_OJZ3WjJE11OuRkUoXt2nw9xd8F2nlsg09XTh1ISOQNK1tuPRL_Cn5AnvcqOq1pkEvmlyr9A6PX_E7SBnZBcX-KWhHzK_Z2WGPQvJnyhTGQT6D9Al9Ml2OCh44cNLNIoDeO3bQFAiZh2VgmULKj7SO6OVaYHI6MZ9MNPXI1wJATll-5xoUgHHtdZvXbshw')

});

test('Admin component not visible to non admin', () => {
    const component = renderer.create(
        <App />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});