# Handling Data for keras 
from __future__ import print_function
import os
import sys
import numpy as np
np.random.seed(1337)

import pandas as pd
import random
#from sklearn.utils import shuffle

from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils.np_utils import to_categorical
from keras.layers import Dense, Input, Flatten, Activation
from keras.layers import Convolution1D, MaxPooling1D, Embedding
from keras.models import Model, Sequential
from keras.callbacks import ModelCheckpoint 
from keras.utils import np_utils

MAX_SEQUENCE_LENGTH = 200
MAX_NB_WORDS = 20000
EMBEDDING_DIM = 100
VALIDATION_SPLIT = 0.2

df = pd.read_csv('./data/data.csv')
# random shuffle
df = df.sample(frac=1).reset_index(drop=True)

# Removing NaNs (only 5 rows)
df = df[pd.notnull(df['title'])]

pos = df[df['label'] == 1]
neg = df[df['label'] == 0]

# We have more neg samples than pos, so even things out
neg_sample = neg.sample(len(pos))

# Merging pos and neg
data = pos.append(neg_sample, ignore_index=True)

# Get Train, Test and Valid data ready
X, Y = np.array(data['title']), np.array(data['label'])


BASE_DIR = './data/'
GLOVE_DIR = BASE_DIR + '/glove.6B/'

# first, build index mapping words in the embeddings set
# to their embedding vector

print('Indexing word vectors.')

embeddings_index = {}
f = open(os.path.join(GLOVE_DIR, 'glove.6B.100d.txt'))
for line in f:
    values = line.split()
    word = values[0]
    coefs = np.asarray(values[1:], dtype='float32')
    embeddings_index[word] = coefs
f.close()

print('Found %s word vectors.' % len(embeddings_index))

#Passing through tokenizer
texts = X.tolist()
tokenizer = Tokenizer()
tokenizer.fit_on_texts(texts)
sequences = tokenizer.texts_to_sequences(texts)

word_index = tokenizer.word_index
print('Found %s unique tokens.' % len(word_index))

data = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)
labels = np_utils.to_categorical(np.asarray(Y))
print('Shape of data tensor:', data.shape)
print('Shape of label tensor:', labels.shape)

indices = np.arange(data.shape[0])
np.random.shuffle(indices)
data = data[indices]
labels = labels[indices]
nb_validation_samples = int(0.1 * data.shape[0])

x_train = data[:-nb_validation_samples]
y_train = labels[:-nb_validation_samples]
x_val = data[-nb_validation_samples:]
y_val = labels[-nb_validation_samples:]

# prepare embedding matrix
print('Preparing the Embedding Matrix')
nb_words = len(word_index)
embedding_matrix = np.zeros((nb_words, EMBEDDING_DIM))
for word, i in word_index.items():
    if i > MAX_NB_WORDS:
        continue
    embedding_vector = embeddings_index.get(word)
    if embedding_vector is not None:
        # words not found in embedding index will be all-zeros.
        embedding_matrix[i] = embedding_vector
        
# load pre-trained word embeddings into an Embedding layer
# note that we set trainable = False so as to keep the embeddings fixed
embedding_layer = Embedding(nb_words,
                            EMBEDDING_DIM,
                            weights=[embedding_matrix],
                            input_length=MAX_SEQUENCE_LENGTH,
                            trainable=True)

model = Sequential()

model.add(embedding_layer)
model.add(Convolution1D(32, 3))
model.add(Activation('relu'))
model.add(MaxPooling1D(5))

# model.add(Convolution1D(32, 3))
# model.add(Activation('relu'))
# model.add(MaxPooling1D(5))

# model.add(Convolution1D(32, 3))
# model.add(Activation('relu'))
# model.add(MaxPooling1D(5))
# model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(32))
model.add(Activation('relu'))
model.add(Dense(2))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['acc'])

# checkpoint
# filepath="weights-improvement-{epoch:02d}-{val_acc:.2f}.hdf5"
# checkpoint = ModelCheckpoint(filepath, monitor='val_acc', verbose=1, save_best_only=True, mode='max')
# callbacks_list = [checkpoint]

# Fitting the model
model.fit(x_train, y_train, validation_data=(x_val, y_val), nb_epoch=1, 
    batch_size=32)

model.save('models/saved/cur.h5')

