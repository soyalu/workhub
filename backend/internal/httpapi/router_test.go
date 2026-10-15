package httpapi

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealth(t *testing.T) {
	request := httptest.NewRequest(http.MethodGet, "/api/health", nil)
	recorder := httptest.NewRecorder()
	NewRouter().ServeHTTP(recorder, request)
	if recorder.Code != http.StatusOK {
		t.Fatalf("status %d", recorder.Code)
	}
	if contentType := recorder.Header().Get("Content-Type"); contentType != "application/json; charset=utf-8" {
		t.Fatalf("unexpected content-type: %s", contentType)
	}
	var response HealthResponse
	if err := json.Unmarshal(recorder.Body.Bytes(), &response); err != nil {
		t.Fatal(err)
	}
	if response.Status != "ok" || response.Service != "workhub-api" {
		t.Fatalf("unexpected response: %+v", response)
	}
}

func TestHealthRejectsPost(t *testing.T) {
	request := httptest.NewRequest(http.MethodPost, "/api/health", nil)
	recorder := httptest.NewRecorder()
	NewRouter().ServeHTTP(recorder, request)
	if recorder.Code != http.StatusMethodNotAllowed {
		t.Fatalf("expected 405, got %d", recorder.Code)
	}
}
