ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
	tens = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
	scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"]

	convert: (num) ->
		number = Math.abs(num)
		return @check_negative(num, @convert_less_than_hundred number) if number < 100
		return @check_negative(num, @convert_less_than_thousand number) if number < 1000
		for n in [0..scales.length]
			previousScale = n - 1
			scaleValue = Math.pow(1000, n)
			if scaleValue > number
				previousScaleValue = Math.pow(1000, previousScale)
				numberPart = parseInt(number / previousScaleValue, 10)
				remainder = number - (numberPart * previousScaleValue)
				word = @convert_less_than_thousand(numberPart) + " " + scales[previousScale]
				if remainder > 0
					word = word + ", " + @convert(remainder);
				return @check_negative(num, word)	

	convert_less_than_hundred: (number) ->
		return ones[number] if number < 20
		for i in [0..tens.length]
			tempVal = 20 + 10 * i
			if tempVal + 10 > number
				if (number % 10 != 0)
					return tens[i] + " " + ones[number % 10]
				return tens[i]	

	convert_less_than_thousand: (number) ->
		word = ""
		remainder = parseInt(number / 100, 10)
		modulus = parseInt(number % 100, 10)
		if remainder > 0
			word = ones[remainder] + " hundred"
			if modulus > 0
				word = word + " "
		if modulus > 0
			word = word + @convert_less_than_hundred modulus	
		word

	check_negative: (number, word) ->
		return if number < 0 then "negative " + word else word
	ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
	tens = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
	scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"]

	convert: (num) ->
		number = Math.abs(num)
		return @check_negative(num, @convert_less_than_hundred number) if number < 100
		return @check_negative(num, @convert_less_than_thousand number) if number < 1000
		for n in [0..scales.length]
			previousScale = n - 1
			scaleValue = Math.pow(1000, n)
			if scaleValue > number
				previousScaleValue = Math.pow(1000, previousScale)
				numberPart = parseInt(number / previousScaleValue, 10)
				remainder = number - (numberPart * previousScaleValue)
				word = @convert_less_than_thousand(numberPart) + " " + scales[previousScale]
				if remainder > 0
					word = word + ", " + @convert(remainder);
				return @check_negative(num, word)	

	convert_less_than_hundred: (number) ->
		return ones[number] if number < 20
		for i in [0..tens.length]
			tempVal = 20 + 10 * i
			if tempVal + 10 > number
				if (number % 10 != 0)
					return tens[i] + " " + ones[number % 10]
				return tens[i]	

	convert_less_than_thousand: (number) ->
		word = ""
		remainder = parseInt(number / 100, 10)
		modulus = parseInt(number % 100, 10)
		if remainder > 0
			word = ones[remainder] + " hundred"
			if modulus > 0
				word = word + " "
		if modulus > 0
			word = word + @convert_less_than_hundred modulus	
		word

	check_negative: (number, word) ->
		return if number < 0 then "negative " + word else word