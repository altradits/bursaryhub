package services

import (
	"crypto/rand"
	"fmt"
	"os"
	"time"
)

var otpStore = make(map[string]OTPRecord)

type OTPRecord struct {
	OTP      string
	Expiry   time.Time
	UserID   uint
	Role     string
}

// GenerateOTP creates a 6-digit OTP code
func GenerateOTP() string {
	code := make([]byte, 6)
	rand.Read(code)
	for i := range code {
		code[i] = byte('0' + (code[i] % 10))
	}
	return string(code)
}

// SendOTP sends SMS OTP via Africa's Talking stub
func SendOTP(phone, otp string) error {
	apiKey := os.Getenv("AFRICAS_TALKING_API_KEY")
	username := os.Getenv("AFRICAS_TALKING_USERNAME")
	
	if apiKey == "" || username == "" {
		// Stub mode - just log the OTP
		fmt.Printf("[STUB] OTP for %s: %s\n", phone, otp)
		return nil
	}
	
	// In production, integrate with Africa's Talking API
	// https://developers.africastalking.com/docs
	return nil
}

// StoreOTP stores OTP temporarily (5-minute expiry)
func StoreOTP(phone string, otp string, userID uint, role string) {
	otpStore[phone] = OTPRecord{
		OTP:    otp,
		Expiry: time.Now().Add(5 * time.Minute),
		UserID: userID,
		Role:   role,
	}
}

// VerifyOTP checks if OTP is valid and not expired
func VerifyOTP(phone, otp string) (*OTPRecord, bool) {
	record, exists := otpStore[phone]
	if !exists {
		return nil, false
	}
	
	if time.Now().After(record.Expiry) {
		delete(otpStore, phone)
		return nil, false
	}
	
	if record.OTP != otp {
		return nil, false
	}
	
	delete(otpStore, phone)
	return &record, true
}