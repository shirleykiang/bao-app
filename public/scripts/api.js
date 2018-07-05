/* global $ store noteful */
"use strict";

const api = (function () {
  const details = function (path) {
    return $.ajax({
      type: "GET",
      dataType: "json",
      url: path,
      headers: { "Authorization": `Bearer ${loadAuthToken()}` || null}
    });
  };
  const update = function (path, obj) {
    return $.ajax({
      type: "PUT",
      url: path,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(obj),
      headers: { "Authorization": `Bearer ${loadAuthToken()}` }
    });
  };
  const create = function (path, obj) {
    return $.ajax({
      type: "POST",
      url: path,
      contentType: "application/json",
      dataType: "json",
      processData: false,
      data: JSON.stringify(obj),
      headers: { "Authorization": `Bearer ${loadAuthToken()}` }
    });
  };
  const remove = function (path) {
    return $.ajax({
      type: "DELETE",
      dataType: "json",
      url: path,
      headers: { "Authorization": `Bearer ${loadAuthToken()}` }
    });
  };
  return {
    create,
    details,
    update,
    remove
  };
}());