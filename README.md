# 심플 계산기

바이브 코딩 입문자용 HTML, CSS, JavaScript 계산기입니다.

---

## 기술 스택

| 구분 | 내용 |
|------|------|
| **HTML5** | 구조 마크업, 시맨틱 요소 |
| **CSS3** | 레이아웃·스타일, Grid |
| **JavaScript (Vanilla)** | DOM 조작, 이벤트 처리, 계산 로직 |

---

## 프로젝트 구조

```
├── index.html   # 계산기 마크업
├── style.css    # 스타일시트
├── script.js    # 계산·입력·기록 로직
└── README.md    # 기술 문서 (본 파일)
```

---

## HTML 구현

- **표시 영역**: `<input type="text" id="display" readonly placeholder="0" />`
  - `readonly`: 사용자가 직접 타이핑하지 않고, 버튼/키보드 이벤트로만 값이 갱신되도록 설정.
- **버튼**: `data-value` 속성으로 값 전달 (예: `data-value="7"`, `data-value="+"`).
  - `querySelectorAll`로 한 번에 선택 후, `data-value`로 클릭 시 입력할 문자/동작 구분.
- **연결**: `<link rel="stylesheet" href="style.css">`, `<script src="script.js"></script>` 로 CSS/JS 분리 로드.

---

## CSS 구현

- **레이아웃**: `.buttons`에 `display: grid`, `grid-template-columns: repeat(4, 1fr)` 로 4열 버튼 그리드.
- **스타일**: 다크 그라데이션 배경, 계산기 패널(`.calculator`)은 배경색·border-radius·box-shadow로 구분.
- **반응**: `button:hover`, `button:active`로 호버/클릭 시 색상·scale 변화.
- **Clear 버튼**: `.clear` 클래스로 빨간 계열 배경으로 시각적 구분.

---

## JavaScript 구현

### 1. DOM 참조

- `document.getElementById('display')`: 표시용 input 요소.
- `document.querySelectorAll('.buttons button')`: 모든 숫자·연산·기능 버튼.

### 2. 표시 제어

- **`updateDisplay(value)`**: `display.value` 또는 `placeholder`를 갱신. 빈 값이면 placeholder만 `"0"`으로.
- **`getDisplayValue()`**: 현재 화면에 보이는 값 반환 (`value` 없으면 `placeholder` 사용).

### 3. 계산 로직 (`calculate()`)

1. `getDisplayValue()`로 현재 식 문자열 획득.
2. **입력 정제**: `replace(/[^\d+\-*/. ]/g, '')` 로 숫자·`+`·`-`·`*`·`/`·`.`·공백만 남겨, 위험 문자 제거.
3. **`eval(safeExpr)`** 로 수식 계산.
4. 결과가 유한한 숫자인지 검사 후, 정수면 정수 문자열, 실수면 `toFixed(10)` 기반 문자열로 변환해 표시.
5. 예외 또는 비정상 결과 시 `"Error"` 표시.

### 4. 계산 기록 (최근 5개)

- **배열**: `const history = []` 에 `"식 = 결과"` 형태 문자열 저장.
- **저장**: 계산 성공 시 `history.push(record)`.
- **크기 제한**: `if (history.length > 5) history.shift()` 로 5개 초과 시 맨 앞 요소 제거.
- **콘솔 출력**: 매 계산 후 `console.log('최근 계산 기록:', [...history])` 로 현재 기록 배열 출력.

### 5. 이벤트 처리

| 방식 | 구현 |
|------|------|
| **버튼 클릭** | `buttons.forEach` + `addEventListener('click')`, `data-value`에 따라 `calculate()` / `clearDisplay()` / `appendToDisplay(value)` 호출. |
| **키보드** | `document.addEventListener('keydown')` 에서 `e.key` 확인. 숫자(`0`–`9`), `+`, `-`, `*`, `/`, `.` → `appendToDisplay(key)`; `Enter` → `calculate()`. 필요 시 `e.preventDefault()` 로 기본 동작 방지. |

### 6. 입력 규칙

- **`appendToDisplay(char)`**: 현재 값이 `"0"`일 때 숫자 입력 시 `"0"`을 대체; `"Error"`일 때는 비운 뒤 새로 입력.
- **C 버튼**: `clearDisplay()` 로 표시 영역 초기화.

---

## 실행 방법

1. 프로젝트 폴더에서 `index.html` 을 브라우저로 연다.
2. 버튼 클릭 또는 키보드(숫자, `+`, `-`, `*`, `/`, `Enter`)로 계산.
3. 개발자 도구(F12) → Console 탭에서 **최근 계산 기록** 배열 확인.

---

## 요약

- **입력창**: `readonly`, 버튼·키보드로만 갱신.
- **계산**: 입력 정제 후 `eval()` 사용, 예외·무한대 등은 `"Error"` 처리.
- **기록**: 최근 5개를 배열에 유지하고, 매 계산 후 콘솔에 출력.
