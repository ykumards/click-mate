from keras.layers import Convolution1D, MaxPooling1D, Activation
from keras.layers import Embedding, Flatten, Dense, Input, Dropout
from keras.models import Sequential, Model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import np_utils

MAX_SEQUENCE_LENGTH = 1000

def ConvNet1D(vocab_size, embedding_dim, input_length, embedding_weights=None):
		
	if not embedding_weights:
		embedding_layer = Embedding(vocab_size+1, embedding_dim, input_length=input_length, trainable=True)
	else:
		embedding_layer = Embedding(vocab_size+1, embedding_dim, input_length=input_length, weights=[embedding_weights], trainable=True)
	
	model = Sequential()

	model.add(embedding_layer)
	model.add(Convolution1D(128, 5))
	model.add(Activation('relu'))
	model.add(MaxPooling1D(5))

	model.add(Convolution1D(128, 5))
	model.add(Activation('relu'))
	model.add(MaxPooling1D(5))

	model.add(Convolution1D(128, 5))
	model.add(Activation('relu'))
	model.add(MaxPooling1D(35))
	model.add(Dropout(0.25))

	model.add(Flatten())
	model.add(Dense(128))
	model.add(Activation('relu'))
	model.add(Dense(2))
	model.add(Activation('softmax'))

	return model