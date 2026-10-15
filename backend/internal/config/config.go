package config

import (
	"fmt"
	"net"
	"os"
	"strconv"
)

const (
	defaultHost = "127.0.0.1"
	defaultPort = 3001
)

type Config struct {
	Host string
	Port int
}

func Load() (Config, error) {
	cfg := Config{Host: defaultHost, Port: defaultPort}
	if host := os.Getenv("WORKHUB_HOST"); host != "" {
		cfg.Host = host
	}
	if raw := os.Getenv("WORKHUB_PORT"); raw != "" {
		port, err := strconv.Atoi(raw)
		if err != nil || port < 1 || port > 65535 {
			return Config{}, fmt.Errorf("invalid WORKHUB_PORT %q: expected 1-65535", raw)
		}
		cfg.Port = port
	}
	return cfg, nil
}

func (c Config) Address() string {
	return net.JoinHostPort(c.Host, strconv.Itoa(c.Port))
}
