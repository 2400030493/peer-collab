import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [mfaPending, setMfaPending] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  const getInitials = (name) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  // Student login — accepts name or studentId + password
  const loginStudent = ({ name, studentId, password }) => {
    const displayName = name || `Student ${studentId}`;
    setUser({
      id: Date.now(),
      name: displayName,
      identifier: name || studentId,
      role: 'student',
      avatar: getInitials(displayName),
      department: 'Computer Science',
    });
    setMfaPending(false);
    return { success: true };
  };

  // Teacher login step 1 — verify code + password, then trigger MFA
  const loginTeacher = ({ teacherCode, password }) => {
    // Generate a mock 6-digit MFA code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    console.log(`%c[MFA CODE]: ${code}`, 'color: #6366f1; font-weight: bold; font-size: 16px;');
    setMfaCode(code);
    setMfaPending(true);
    // Temporarily store teacher info
    setUser({
      id: Date.now(),
      name: `Teacher ${teacherCode}`,
      identifier: teacherCode,
      role: 'teacher',
      avatar: 'T' + teacherCode.slice(-1),
      department: 'Computer Science',
      _pendingMfa: true,
    });
    return { success: true, mfaRequired: true };
  };

  // MFA verification step 2
  const verifyMfa = (enteredCode) => {
    if (enteredCode === mfaCode) {
      setMfaPending(false);
      setMfaCode('');
      setUser((prev) => ({ ...prev, _pendingMfa: false }));
      return { success: true };
    }
    return { success: false, error: 'Invalid MFA code. Please try again.' };
  };

  const logout = () => {
    setUser(null);
    setMfaPending(false);
    setMfaCode('');
  };

  const isAuthenticated = !!user && !user._pendingMfa;
  const isTeacher = user?.role === 'teacher' && !user._pendingMfa;
  const isStudent = user?.role === 'student';

  return (
    <AuthContext.Provider
      value={{
        user,
        loginStudent,
        loginTeacher,
        verifyMfa,
        logout,
        isAuthenticated,
        isTeacher,
        isStudent,
        mfaPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
