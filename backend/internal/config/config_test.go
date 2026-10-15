package config

import "testing"

func TestLoadDefaults(t *testing.T) {
	t.Setenv("WORKHUB_HOST", "")
	t.Setenv("WORKHUB_PORT", "")
	cfg, err := Load()
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Address() != "127.0.0.1:3001" {
		t.Fatalf("unexpected address: %s", cfg.Address())
	}
}

func TestLoadOverride(t *testing.T) {
	t.Setenv("WORKHUB_HOST", "localhost")
	t.Setenv("WORKHUB_PORT", "4001")
	cfg, err := Load()
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Address() != "localhost:4001" {
		t.Fatalf("unexpected address: %s", cfg.Address())
	}
}

func TestLoadRejectsInvalidPort(t *testing.T) {
	t.Setenv("WORKHUB_PORT", "65536")
	if _, err := Load(); err == nil {
		t.Fatal("expected invalid port error")
	}
}
