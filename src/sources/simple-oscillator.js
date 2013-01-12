var SimpleOscillator = Source({
	name: 'SimpleOscillator',
	params: {
		waveform: 'sine'
	}
})


SimpleOscillator.waveforms = {}

SimpleOscillator.waveforms.sine = function (dst, phases) {
	DSP.mul(dst, phases, Math.PI * 2)
	DSP.sin(dst, dst)
}

SimpleOscillator.waveforms.square = function (dst, phases) {
	DSP.mul(dst, phases, Math.PI * 2)
	DSP.sin(dst, dst)
	DSP.sign(dst, dst)
}

SimpleOscillator.waveforms.sawtooth = function (dst, phases) {
	DSP.mul(dst, dst, -2)
	DSP.add(dst, dst, 1)
}

SimpleOscillator.waveforms['inverse sawtooth'] = function (dst, phases) {
	DSP.mul(dst, dst, 2)
	DSP.sub(dst, dst, 1)
}

SimpleOscillator.waveforms.triangle = function (dst, phases) {
	for (var i=0; i<dst.length; i++) {
		dst[i] = dst[i] < 0.5 ? 4 * dst[i] - 1 : 3 - 4 * dst[i]
	}
}

SimpleOscillator.waveforms.pulse = function (dst, phases) {
	for (var i=0; i<dst.length; i++) {
		dst[i] = dst[i] < 0.5 ?
			dst[i] < 0.25 ?
				dst[i] * 8 - 1 :
				-dst[i] * 8 - 1 :
			-1
	}
}


SimpleOscillator.prototype.process = function (dst, phases) {
	var waveform = this.params.waveform

	SimpleOscillator.waveforms[waveform](dst, phases)
}
