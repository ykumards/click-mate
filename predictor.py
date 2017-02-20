import sys
from keras.layers import Conv1D, MaxPooling1D, Embedding
from keras.models import Model, load_model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import np_utils

MAX_SEQUENCE_LENGTH = 200
MAX_NB_WORDS = 20000
EMBEDDING_DIM = 100

# first, build index mapping words in the embeddings set
# to their embedding vector

# print('Indexing word vectors.')

# embeddings_index = {}
# f = open(os.path.join(GLOVE_DIR, 'glove.6B.100d.txt'))
# for line in f:
#     values = line.split()
#     word = values[0]
#     coefs = np.asarray(values[1:], dtype='float32')
#     embeddings_index[word] = coefs
# f.close()


class CheckBait(object):
	def __init__(self, model_path):
		model = load_model(model_path)
		self.model = model

	def predict(self, title):
		title = title.encode("ascii", "ignore")
		text = [title]
		tokenizer = Tokenizer()
		tokenizer.fit_on_texts(text)
		sequences1 = tokenizer.texts_to_sequences(text)
		input_sent = pad_sequences(sequences1, maxlen=MAX_SEQUENCE_LENGTH)
		clickbait_prob = self.model.predict(input_sent)[0][1]
		return clickbait_prob

checkbaitor = CheckBait("models/saved/current.h5")

if __name__ == "__main__":
	print ("headline is {0} % clickbaity".format(round(checkbaitor.predict(sys.argv[1]) * 100, 2)))


